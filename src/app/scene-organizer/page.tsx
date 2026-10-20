"use client"; //TODO: remove later

import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  SceneNode,
  type SceneFlowNode,
  type SceneTextField,
} from "./Scene.component";
import { useRef, useState, type SubmitEventHandler } from "react";

type ArcFlowNode = Node<{ label: string }, "arc">;
type OrganizerNode = SceneFlowNode | ArcFlowNode;

function ArcNode({ data }: NodeProps<ArcFlowNode>) {
  return (
    <div className="h-full w-full border-2 border-dashed border-slate-500 bg-slate-100/80 p-4">
      <h2 className="text-lg font-semibold text-slate-800">{data.label}</h2>
    </div>
  );
}

const nodeTypes = {
  scene: SceneNode,
  arc: ArcNode,
};

export default function SceneOrganizer() {
  // TODO / idea:
  // Kind of a canvas, will require a db
  // You create a scene, not necessarily fully written, just title + summary
  // Each scene can be grouped in an arc from the three act structure + story beats
  // In each scene, you can highlight words or phrases and link them
  // to another scene (or another highlighted word or phrase)
  //If you have created characters in the app, you can connect scenes
  // to different points of their character sheet (e.g. the misbelief
  // of character X is that they are a failiure, there is a scene
  // where they grow in that sense, you can link the two things.)
  const initialNodes: OrganizerNode[] = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  const refArcs = useRef<HTMLDialogElement>(null);
  const onConnect = (connection: Connection) => {
    setEdges((currentEdges) => addEdge(connection, currentEdges));
  };
  const onTextSelect = (
    nodeId: string,
    field: SceneTextField,
    start: number,
    end: number,
  ) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id !== nodeId) return node;

        const highlights = node.data.highlights ?? [];
        const overlaps = highlights.some(
          (highlight) =>
            highlight.field === field &&
            start < highlight.end &&
            end > highlight.start,
        );
        if (overlaps) return node;

        return {
          ...node,
          data: {
            ...node.data,
            highlights: [
              ...highlights,
              { id: `${field}-${start}-${end}`, field, start, end },
            ],
          },
        };
      }),
    );
  };
  const addScene = (title = "prova", description = "prova 2") => {
    setNodes((prev) => {
      const nextPos = (prev.at(-1)?.position.x ?? -100) + 100;
      return [
        ...prev,
        {
          id: `n${prev.length + 1}`,
          type: "scene",
          position: { x: nextPos, y: nextPos },
          data: { title, description, onTextSelect },
        },
      ];
    });
  };
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    addScene(fd.get("title") as string, fd.get("description") as string);
    ref.current?.close();
  };

  const handleSubmitArc: SubmitEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const arcName = fd.get("arc");
    if (typeof arcName !== "string" || !arcName) return;

    setNodes((currentNodes) => [
      {
        id: `arc-${crypto.randomUUID()}`,
        type: "arc",
        position: { x: 40, y: 40 },
        style: { width: 480, height: 320 },
        zIndex: 0,
        data: { label: arcName },
      },
      ...currentNodes,
    ]);
    refArcs.current?.close();
  };

  const handleNodeDragStop = (_event: React.MouseEvent, draggedNode: OrganizerNode) => {
    if (draggedNode.type !== "scene" || draggedNode.parentId) return;

    const nodeWidth = draggedNode.measured?.width ?? draggedNode.width ?? 0;
    const nodeHeight = draggedNode.measured?.height ?? draggedNode.height ?? 0;
    const centerX = draggedNode.position.x + nodeWidth / 2;
    const centerY = draggedNode.position.y + nodeHeight / 2;

    const parent = nodes.find(
      (node): node is ArcFlowNode =>
        node.type === "arc" &&
        centerX >= node.position.x &&
        centerX <= node.position.x + 480 &&
        centerY >= node.position.y &&
        centerY <= node.position.y + 320,
    );
    if (!parent) return;

    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === draggedNode.id
          ? {
              ...node,
              parentId: parent.id,
              extent: "parent",
              position: {
                x: draggedNode.position.x - parent.position.x,
                y: draggedNode.position.y - parent.position.y,
              },
            }
          : node,
      ),
    );
  };
  return (
    <>
      <aside className="w-[20vw] h-screen fixed top-0 left-0 mt-[100px] px-2 border-r border-r-black border-r-5">
        <button
          onClick={() => ref.current?.showModal()}
          className="inline-flex items-center justify-center border border-[var(--primary)] bg-[var(--bg)] px-6 py-3 text-sm font-semibold text-[var(--primary)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
        >
          Add scene
        </button>
        <button
          onClick={() => refArcs.current?.showModal()}
          className="inline-flex items-center justify-center border border-[var(--primary)] bg-[var(--bg)] px-6 py-3 text-sm font-semibold text-[var(--primary)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
        >
          Add arc
        </button>
      </aside>
      <dialog ref={ref} className="left-1/2 top-1/2 -translate-1/2 p-5">
        <form
          onSubmit={handleSubmit}
          className="[&_input]:border [&_textarea]:border flex flex-col gap-2"
        >
          <h2>Create your scene</h2>
          <input type="text" name="title" />
          <textarea name="description" id=""></textarea>
          <div className="flex gap-2">
            <button
              type="reset"
              onClick={() => ref.current?.close()}
              className="bg-[var(--primary)] text-[var(--bg)] px-3 py-1"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-[var(--bg)] text-[var(--primary)] border px-3 py-1"
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>
      <dialog ref={refArcs} className="left-1/2 top-1/2 -translate-1/2 p-5">
        <form
          onSubmit={handleSubmitArc}
          className="[&_input]:border [&_textarea]:border flex flex-col gap-2"
        >
          <h2>Choose an arc</h2>
          <select name='arc'>
            <option value="The Setup">The Setup</option>
            <option value="The Conflict">The Conflict</option>
            <option value="The Resolution">The Resolution</option>
          </select>
          <div className="flex gap-2">
            <button
              type="reset"
              onClick={() => ref.current?.close()}
              className="bg-[var(--primary)] text-[var(--bg)] px-3 py-1"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-[var(--bg)] text-[var(--primary)] border px-3 py-1"
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>
      <div
        className={`h-[calc(100vh-100px)] w-[80vw] mt-[100px] ml-[20vw] right-0 p-5${
          isConnecting ? " connection-dragging" : ""
        }`}
      >
        <ReactFlow
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={() => setIsConnecting(true)}
          onConnectEnd={() => setIsConnecting(false)}
          onNodeDragStop={handleNodeDragStop}
          onEdgeDoubleClick={(_, edge) => {
            setEdges((currentEdges) =>
              currentEdges.filter((currentEdge) => currentEdge.id !== edge.id),
            );
          }}
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={{ type: "step" }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>{" "}
    </>
  );
}

//libraries: react-flow
// dnd kit to drag and drop created scenes
// next auth
// tip-tap editor
