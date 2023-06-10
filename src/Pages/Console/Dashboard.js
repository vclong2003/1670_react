import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import store from "../../Redux/store";
import { getOrderStatistic } from "../../Redux/dashboardSlice";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { orderStatistic } = useSelector((state) => state.dashboard);
  useEffect(() => {
    store.dispatch(getOrderStatistic());
  }, []);
  // const labels = ["January", "February", "March"];
  const labels = orderStatistic.map((item) => item.month);
  const datasets = [
    {
      label: "Orders",
      data: orderStatistic.map((item) => item.quantity),
      backgroundColor: "#FFD333",
    },
    {
      label: "Revenue ($)",
      data: orderStatistic.map((item) => item.revenue),
      backgroundColor: "#3D464D",
    },
  ];

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
      {console.log(orderStatistic)}
      <div className="container-fluid bg-light p-4">
        <div className="row">
          <div className="col-1" />
          <div className="col-10">
            <Bar
              options={options}
              data={{
                labels,
                datasets,
              }}
            />
          </div>
          <div className="col-1" />
        </div>
      </div>
    </>
  );
}
