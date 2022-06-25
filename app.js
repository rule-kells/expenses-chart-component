const chart = document.getElementById('chart')

const formatToCurrency = (amt) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    amt,
  )

const isCurrentDay = (currentDayName = 'Wednesday') => {
  const today = new Date().getDay()
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]


 return daysOfWeek[today] === currentDayName
}

function generateChartDays(item) {
  const data = {
    ariaLabelDay: item.fullWeekDay,
    dayName: item.day,
    dayAmt: item.amount,
    currentDay: isCurrentDay(item.fullWeekDay)
  }

  return `
          <li><button class="weekday" aria-label="spending for ${
            data.ariaLabelDay
          } was ${data.dayAmt}">
              <div class="bar ${data.currentDay === true ? 'bar-current' : ''} bar-${data.dayName}"></div>
              <span class="fs-weekday">${data.dayName}</span>
            </button>
            <p aria-label="hidden" class="bar-amt">${formatToCurrency(
              data.dayAmt,
            )}</p>
          </li>
    `
}

async function fetchChartData() {
  const fetchChartData = await fetch('./data.json')
  const chartData = await fetchChartData.json()
  chart.innerHTML = chartData.map((d) => generateChartDays(d)).join('')
}

fetchChartData()
