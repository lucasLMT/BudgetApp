import { FC, useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

const AddBudgetForm: FC = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef<HTMLFormElement>(null);
  const budgetNameField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
      budgetNameField.current?.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="mb-6 flex flex-wrap gap-8 lg:mb-0 lg:w-1/2">
      <div className="grid w-full gap-4">
        <div className="form-wrapper grid max-w-3xl gap-4 rounded-xl border-4 border-white p-2 shadow-xl">
          <div className="rounded-xl border border-dashed border-muted p-4">
            <h2 className="h3 mb-4 text-2xl font-bold">Create a budget</h2>
            <fetcher.Form method="post" className="grid gap-4" ref={formRef}>
              <div className="grid gap-1">
                <label htmlFor="newBudget" className="text-lg font-bold">
                  Budget name
                </label>
                <input
                  type="text"
                  name="newBudget"
                  id="newBudget"
                  placeholder="e.g., Groceries"
                  required
                  className="rounded-md border border-muted bg-bkg p-2 outline-none focus:border-2 focus:border-accent"
                  ref={budgetNameField}
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="newBudgetAmount" className="text-lg font-bold">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="newBudgetAmount"
                  id="newBudgetAmount"
                  placeholder="e.g., $350"
                  required
                  inputMode="decimal"
                  className="rounded-md border border-muted bg-bkg p-2 outline-none focus:border-2 focus:border-accent"
                />
              </div>
              <input type="hidden" name="_action" value="newBudget" />
              <button
                type="submit"
                className="w-fit cursor-pointer rounded-lg bg-gray-950 p-2 text-gray-200 ring-offset-2 transition-shadow hover:ring hover:ring-gray-950 focus:outline-none focus:ring focus:ring-gray-950 focus-visible:ring-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span className="mr-2">Create Budget</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="inline-block h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </>
                )}
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBudgetForm;
