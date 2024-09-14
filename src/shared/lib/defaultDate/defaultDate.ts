export const getDefaultDateDay = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const getDefaultDateMonth = () => {
    const today = new Date();
    return today.toISOString().slice(0, 7);
};

export const getDefaultDateWeek = () => {
    const today = new Date();
    const year = today.getFullYear();

    const getWeekNumber = (date: Date) => {
        const thursday = new Date(date.getTime());
        thursday.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7)); // Корректируем на четверг (ISO 8601)
        const firstThursday = new Date(thursday.getFullYear(), 0, 4);
        const weekNumber = Math.round(
            ((thursday.getTime() - firstThursday.getTime()) / 86400000 + firstThursday.getDay() + 1) / 7
        );
        return weekNumber;
    };

    const weekNumber = getWeekNumber(today).toString().padStart(2, '0');
    return `${year}-${weekNumber}`;
};
