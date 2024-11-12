import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
);

const BarChart = ({ sold, title }) => {
  const options = {
    responsive: true,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: title,
    datasets: [
      {
        label: "Units Sold",
        data: sold,
        backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0", "#ffcd56"],
        borderColor: ["#ff6384", "#36a2eb", "#4bc0c0", "#ffcd56"],
        borderWidth: 1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        {title.map((t, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3 style={{ color: data.datasets[0].backgroundColor[index] }}>
              {t.toUpperCase()}
            </h3>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default BarChart;

