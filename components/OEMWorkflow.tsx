type WorkflowGroup = {
  key: string;
  title: string;
  shape: "rectangle" | "circle";
  firstRowCount: number;
  steps: string[];
};

const workflows: WorkflowGroup[] = [
  {
    key: "workflow_existing_oem",
    title: "Existing Product · OEM",
    shape: "rectangle",
    firstRowCount: 6,
    steps: [
      "Customer puts forward modification requirements",
      "Recommend existing product solution",
      "Evaluate modification scope",
      "Quotation & order confirmation",
      "Make revised sample",
      "Customer sample confirmation",
      "Material procurement + IQC incoming inspection",
      "Mass production | Aging test",
      "Finished product inspection",
      "Inspection & shipment"
    ]
  },
  {
    key: "workflow_existing_odm",
    title: "Existing Product · ODM",
    shape: "circle",
    firstRowCount: 6,
    steps: [
      "Customer puts forward modification requirements",
      "Recommend existing product solution",
      "Evaluate modification scope",
      "Quotation & order confirmation",
      "Make revised sample",
      "Customer sample confirmation",
      "Material procurement + IQC incoming inspection",
      "Mass production | Aging test",
      "Finished product inspection",
      "Inspection & shipment"
    ]
  },
  {
    key: "workflow_new_oem",
    title: "New Product Development · OEM",
    shape: "rectangle",
    firstRowCount: 6,
    steps: [
      "Customer provides new drawings / 3D model",
      "Engineering DFM review",
      "Quotation (mold + production) & order confirmation",
      "Prototype making",
      "Customer prototype confirmation",
      "Mold opening + trial mold & mold revision",
      "Pre-production PP sample making",
      "Customer PP sample sign-off",
      "Material procurement + IQC incoming inspection",
      "Mass production | Aging test",
      "Finished product inspection",
      "Inspection & shipment"
    ]
  },
  {
    key: "workflow_new_odm",
    title: "New Product Development · ODM",
    shape: "circle",
    firstRowCount: 6,
    steps: [
      "Customer puts forward new product concept",
      "Factory structural & electronic design",
      "3D modeling & DFM review",
      "Quotation & order confirmation",
      "Prototype making",
      "Customer prototype confirmation",
      "New mold opening + repeated mold revision",
      "Pre-production PP sample making",
      "Customer PP sample sign-off",
      "Material procurement + IQC incoming inspection",
      "Mass production | Aging test",
      "Finished product inspection",
      "Inspection & shipment"
    ]
  }
];

function textValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export default function OEMWorkflow({
  content
}: {
  content: Record<string, unknown>;
}) {
  return (
    <div className="oem-workflows">
      {workflows.map((workflow, workflowIndex) => {
        const steps = workflow.steps.map((fallback, index) => ({
          number: index + 1,
          text: textValue(
            content[`${workflow.key}_${index + 1}`],
            fallback
          )
        }));

        const rows = [
          steps.slice(0, workflow.firstRowCount),
          steps.slice(workflow.firstRowCount)
        ].filter(row => row.length > 0);

        return (
          <section
            className="oem-workflow"
            key={workflow.key}
          >
            <div className="kicker">
              WORKFLOW {String(workflowIndex + 1).padStart(2, "0")}
            </div>
            <h2>
              {textValue(
                content[`${workflow.key}_title`],
                workflow.title
              )}
            </h2>

            {rows.map((row, rowIndex) => (
              <div
                className={`oem-workflow-grid count-${row.length} ${
                  workflow.shape === "circle"
                    ? "is-circle"
                    : "is-rectangle"
                }`}
                key={`${workflow.key}-row-${rowIndex}`}
              >
                {row.map(step => (
                  <article
                    className="oem-workflow-card"
                    key={step.number}
                  >
                    <span className="oem-workflow-number">
                      {step.number}
                    </span>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
