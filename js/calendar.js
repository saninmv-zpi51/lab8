const dateOutput = document.querySelector("#selectedDate");
const eventInfo = document.querySelector("#eventInfo");
const tableBody = document.querySelector("#eventsTableBody");

const events = [
  { date:"2026-06-05", time:"12:00", title:"Відкриття виставки сучасного мистецтва", place:"Музей Ханенків" },
  { date:"2026-06-06", time:"14:00", title:"Лекція з історії мистецтва", place:"NAMU" },
  { date:"2026-06-07", time:"11:00", title:"Екскурсія для студентів", place:"PinchukArtCentre" },
  { date:"2026-06-08", time:"13:00", title:"Презентація каталогу виставки", place:"Мистецький Арсенал" },
  { date:"2026-06-09", time:"15:00", title:"Майстер-клас з реставрації", place:"Музей Ханенків" },
  { date:"2026-06-10", time:"10:00", title:"День відкритих дверей", place:"NAMU" },
  { date:"2026-06-11", time:"16:00", title:"Зустріч з художником", place:"PinchukArtCentre" },
  { date:"2026-06-12", time:"15:30", title:"Лекція про український авангард", place:"NAMU" },
  { date:"2026-06-13", time:"12:00", title:"Кураторська екскурсія", place:"Мистецький Арсенал" },
  { date:"2026-06-14", time:"17:00", title:"Вечірня виставка", place:"Музей Ханенків" },
  { date:"2026-06-15", time:"14:30", title:"Практикум з атрибуції", place:"NAMU" },
  { date:"2026-06-16", time:"11:00", title:"Виставка графіки", place:"PinchukArtCentre" },
  { date:"2026-06-17", time:"13:00", title:"Огляд музейної колекції", place:"Музей Ханенків" },
  { date:"2026-06-18", time:"16:00", title:"Лекція про бароко", place:"NAMU" },
  { date:"2026-06-19", time:"10:30", title:"Знайомство з експозицією", place:"Мистецький Арсенал" },
  { date:"2026-06-20", time:"15:00", title:"Дискусія про сучасне мистецтво", place:"PinchukArtCentre" },
  { date:"2026-06-21", time:"11:00", title:"Екскурсія для студентів", place:"PinchukArtCentre" },
  { date:"2026-06-22", time:"14:00", title:"Виставка архівних документів", place:"NAMU" },
  { date:"2026-06-23", time:"12:00", title:"Практичне заняття з музейної справи", place:"Музей Ханенків" },
  { date:"2026-06-24", time:"16:00", title:"Кураторська презентація", place:"Мистецький Арсенал" },
  { date:"2026-06-25", time:"13:00", title:"Майстер-клас для дітей", place:"NAMU" },
  { date:"2026-06-26", time:"15:00", title:"Історія українського модернізму", place:"PinchukArtCentre" },
  { date:"2026-06-27", time:"11:30", title:"Музейний воркшоп", place:"Музей Ханенків" },
  { date:"2026-06-28", time:"17:00", title:"Вечір мистецтва", place:"Мистецький Арсенал" },
  { date:"2026-06-29", time:"10:00", title:"Огляд нових надходжень", place:"NAMU" },
  { date:"2026-06-30", time:"14:00", title:"Екскурсія колекцією ікон", place:"Музей Ханенків" },
  { date:"2026-07-01", time:"15:00", title:"Лекція про музейну реставрацію", place:"NAMU" },
  { date:"2026-07-02", time:"12:00", title:"Демонстрація експонатів", place:"PinchukArtCentre" },
  { date:"2026-07-03", time:"16:00", title:"Закриття виставкового циклу", place:"Мистецький Арсенал" }
];

function renderEventsTable(startDate = null) {
  const filteredEvents = startDate
    ? events.filter(event => event.date >= startDate)
    : events;

  tableBody.innerHTML = filteredEvents
    .map(event => `
      <tr>
        <td>${event.date}</td>
        <td>${event.time}</td>
        <td>${event.title}</td>
        <td>${event.place}</td>
      </tr>
    `)
    .join("");
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

renderEventsTable();

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i",
  minuteIncrement: 30,
  disableMobile: true,

  onChange(selectedDates) {
    if (!selectedDates.length) return;

    const selected = selectedDates[0];
    const selectedDate = formatDate(selected);

    renderEventsTable(selectedDate);

    dateOutput.textContent = `Обрана дата: ${selected.toLocaleString()}`;

    const foundEvent = events.find(event => event.date === selectedDate);

    if (foundEvent) {
      eventInfo.textContent =
        `Подія: ${foundEvent.title}. Час: ${foundEvent.time}. Місце: ${foundEvent.place}.`;
    } else {
      eventInfo.textContent = "На цю дату подій не заплановано.";
    }
  },
});