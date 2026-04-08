export const HOLIDAY_INFO = {
  "0-26": { emoji: "🇮🇳", name: "Republic Day", desc: "India adopted its constitution on this day in 1950." },
  "1-14": { emoji: "❤️", name: "Valentine's Day", desc: "Celebrated internationally as a day of love and affection." },
  "2-25": { emoji: "🎨", name: "Holi", desc: "Festival of colours marking the arrival of spring." },
  "3-14": { emoji: "⚖️", name: "Ambedkar Jayanti", desc: "Birth anniversary of Dr. B.R. Ambedkar, architect of the Indian Constitution." },
  "7-15": { emoji: "🇮🇳", name: "Independence Day", desc: "India gained independence from British rule in 1947." },
  "9-2":  { emoji: "🕊️", name: "Gandhi Jayanti", desc: "Birth anniversary of Mahatma Gandhi, Father of the Nation." },
  "10-14":{ emoji: "🧸", name: "Children's Day", desc: "Celebrated on the birthday of Jawaharlal Nehru, first PM of India." },
  "11-25":{ emoji: "🎄", name: "Christmas", desc: "Celebrates the birth of Jesus Christ." },
};

export const isHoliday = (month, day) => {
  return !!HOLIDAY_INFO[`${month}-${day}`];
};

export const getHoliday = (month, day) => {
  return HOLIDAY_INFO[`${month}-${day}`] || null;
};
