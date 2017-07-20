
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
	type: 'doughnut',
	data: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: "some label",
			backgroundColor: ['#67afe1','#e56385','#6cc04a', '#878787'],
			borderWidth: 0,
			data: [32, 36, 12]
		}]
	},

	// Configuration options go here
	options: {
		cutoutPercentage: 55,
		responsive: false,
		legend: {
			display: false,
			labels: {
				fontColor: 'rgb(255, 99, 132)'
			}
		},
		tooltips: {
			enabled: false
		},
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}
		}
	}
});
