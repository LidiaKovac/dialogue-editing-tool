import { useLayoutEffect, useRef } from "react";
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  type Node,
  type NodeProps,
} from "@xyflow/react";

export type SceneTextField = "title" | "description";

export type SceneTextHighlight = {
  id: string;
  field: SceneTextField;
  start: number;
  end: number;
};

type SceneNodeData = {
  title: string;
  description: string;
  highlights?: SceneTextHighlight[];
  onTextSelect?: (
    nodeId: string,
    field: SceneTextField,
    start: number,
    end: number,
  ) => void;
};

export type SceneFlowNode = Node<SceneNodeData, "scene">;

type SelectableTextProps = {
  nodeId: string;
  field: SceneTextField;
  text: string;
  highlights: SceneTextHighlight[];
  onSelect?: SceneNodeData["onTextSelect"];
};

function SelectableText({
  nodeId,
  field,
  text,
  highlights,
  onSelect,
}: SelectableTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const ranges = highlights
    .filter((highlight) => highlight.field === field)
    .toSorted((first, second) => first.start - second.start);

  const saveSelection = () => {
    const root = textRef.current;
    const selection = window.getSelection();
    if (!root || !selection || selection.isCollapsed || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) {
      return;
    }

    const startRange = document.createRange();
    startRange.selectNodeContents(root);
    startRange.setEnd(range.startContainer, range.startOffset);

    const endRange = document.createRange();
    endRange.selectNodeContents(root);
    endRange.setEnd(range.endContainer, range.endOffset);

    const start = startRange.toString().length;
    const end = endRange.toString().length;
    if (end <= start) return;

    onSelect?.(nodeId, field, start, end);
  };

  const parts = [];
  let cursor = 0;

  for (const highlight of ranges) {
    if (highlight.start < cursor || highlight.end > text.length) continue;
    if (highlight.start > cursor) {
      parts.push(text.slice(cursor, highlight.start));
    }
    parts.push(
      <span
        key={highlight.id}
        className="relative inline-block rounded-sm bg-yellow-300 px-0.5 text-black"
      >
        {text.slice(highlight.start, highlight.end)}
        <Handle
          id={`highlight-${highlight.id}-target`}
          type="target"
          position={Position.Top}
          isConnectable
        />
        <Handle
          id={`highlight-${highlight.id}-source`}
          type="source"
          position={Position.Bottom}
          isConnectable
        />
      </span>,
    );
    cursor = highlight.end;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));

  return (
    <span
      ref={textRef}
      className="nodrag select-text"
      onMouseUp={saveSelection}
      onKeyUp={saveSelection}
    >
      {parts}
    </span>
  );
}

export const SceneNode = (props: NodeProps<SceneFlowNode>) => {
  const highlights = props.data.highlights ?? [];
  const updateNodeInternals = useUpdateNodeInternals();

  useLayoutEffect(() => {
    updateNodeInternals(props.id);
  }, [highlights, props.id, updateNodeInternals]);

  return (
    <div
      className={
        "relative border border-black bg-white p-5 select-none " 
        // +
        //   (highlights.length > 0
        //   ? "[&_*]:select-none"
        //   : "")
      }
    >
      <Handle
        id="scene-target"
        type="target"
        position={Position.Left}
        isConnectable
      />
      <h3>
        <SelectableText
          nodeId={props.id}
          field="title"
          text={props.data.title}
          highlights={highlights}
          onSelect={props.data.onTextSelect}
        />
      </h3>
      <p>
        <SelectableText
          nodeId={props.id}
          field="description"
          text={props.data.description}
          highlights={highlights}
          onSelect={props.data.onTextSelect}
        />
      </p>
      <Handle
        id="scene-source"
        type="source"
        position={Position.Right}
        isConnectable
      />
    </div>
  );
};
