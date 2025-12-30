import { ToolTip } from "@/app/components/Tooltip/Tooltip.component"
import { getAriLabel, getLIXLabel } from "../options.fn"

export const Metrics = ({
  lix,
  dialogueDensity,
}: {
  dialogueDensity: number
  lix: Record<string, number> | null
}) => {
  return (
    <>
      <h3>Readability scores</h3>
      ARI{" "}
      <ToolTip
        data={
          "Automated Readability Index, approximate representation of the US grade level needed to comprehend the text."
        }
      />
      : {lix?.ari ?? 0} - {lix?.ari && getAriLabel(lix.ari)} <br />
      LIX{" "}
      <ToolTip
        data={
          "Läsbarhetsindex, based on number of sentences and number of words, with particular weight on long words."
        }
      />
      : {lix?.lix ?? 0} - {lix?.lix && getLIXLabel(lix.lix)}
      <h3>Density</h3>
      <p>
        Dialogue density:{" "}
        <span className={dialogueDensity > 50 ? "text-red-600" : ""}>
          &nbsp;
          {dialogueDensity}%
        </span>
      </p>
    </>
  )
}
