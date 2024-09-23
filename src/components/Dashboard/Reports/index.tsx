import Graph from "@/components/core/graph";
import Header from "../Header";

const ReportProblems = () => {
  return (
    <div className="w-full py-4 flex flex-col">
      <Header header="Top Problems Reports" />
      <Graph />
    </div>
  );
};
export default ReportProblems;
