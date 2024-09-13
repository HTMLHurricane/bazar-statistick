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
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear =
            (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    const weekNumber = getWeekNumber(today).toString().padStart(2, '0');
    return `${year}-${weekNumber}`;
};
