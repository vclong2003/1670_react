import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import store from "../../Redux/store";
import { getStatistic } from "../../Redux/dashboardSlice";
import { useSelector } from "react-redux";
import LoadingLayer from "../../Components/LoadingLayer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const loading = useSelector((state) => state.dashboard.loading);
  const { revenue, orders, users } = useSelector(
    (state) => state.dashboard.statistic
  );
  useEffect(() => {
    store.dispatch(getStatistic());
  }, []);
  // const labels = ["January", "February", "March"];
  const barChartLabels = revenue.map((item) => item.month);
  const barChartData = [
    {
      label: "Total (orders)",
      data: revenue.map((item) => item.quantity),
      backgroundColor: "#FFD333",
    },
    {
      label: "Revenue ($)",
      data: revenue.map((item) => item.revenue),
      backgroundColor: "#3D464D",
    },
  ];
  const barChartOptions = {
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

  const pieChartLabels = orders.map((item) => item.status);
  const pieChartData = [
    {
      label: "# of orders",
      data: orders.map((item) => item.quantity),
      backgroundColor: ["#E0E0E0", "#FFD333", "#3D464D", "#4A5F63", "#433C4D"],
      borderWidth: 1,
    },
  ];
  const pieChrartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Orders",
      },
    },
  };

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      <div className="container-fluid bg-light p-4">
        <div className="row">
          <div className="col-8">
            <Bar
              options={barChartOptions}
              data={{
                labels: barChartLabels,
                datasets: barChartData,
              }}
            />
          </div>
          <div className="col-4">
            <Pie
              options={pieChrartOptions}
              data={{
                labels: pieChartLabels,
                datasets: pieChartData,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
