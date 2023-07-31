import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatsPage = () => {
  const data = {
    labels: ['Not Listed', 'Freshman', 'Sophomore', 'Junior', 'Senior'],
    datasets: [
      {
        label: 'College Year',
        data: [86, 134, 234, 187, 155],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: '1',
      }
    ]
  };

  const options = {

  }

  return (
  <div>
    <div
      style = {
        {
          padding: '20px',
          width: '80%',
        }
      }>
      <Bar
       data = {data} 
       options = {options}>
        
       </Bar>
    </div>
  </div>
  );
};

export default StatsPage;
