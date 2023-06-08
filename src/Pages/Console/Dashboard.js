import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const labels = ["January", "February", "March"];
  const data = [100, 70, 60];
  const _data = [90, 20, 36];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Last 3 months performance",
      },
    },
  };

  return (
    <>
      <div className="container-fluid bg-light p-4">
        <div className="row">
          <div className="col-1" />
          <div className="col-10">
            <Bar
              options={options}
              data={{
                labels,
                datasets: [
                  {
                    label: "Dataset 1",
                    data: data,
                    backgroundColor: "#FFD333",
                  },
                  {
                    label: "Dataset 2",
                    data: _data,
                    backgroundColor: "#3D464D",
                  },
                ],
              }}
            />
          </div>
          <div className="col-1" />
        </div>
      </div>
    </>
  );
}
