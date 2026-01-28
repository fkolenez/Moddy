import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

type WorkoutDay = {
    date: string; // yyyy-mm-dd
    count: number;
};

type Props = {
    data: WorkoutDay[];
};

export function WorkoutHeatmap({ data }: Props) {
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date().getFullYear(), 11, 31);

    type ValueType = WorkoutDay | undefined;

    return (
        <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={data}
            showWeekdayLabels={false}
            weekdayLabels={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
            classForValue={(value: ValueType) => {
                if (!value) return "color-empty";
                if (value.count === 1) return "color-scale-1";
                if (value.count === 2) return "color-scale-2";
                if (value.count === 3) return "color-scale-3";
                return "color-scale-4"; 
            }}
            tooltipDataAttrs={(value: ValueType) => {
                if (!value || !value.date) return {};
                return {
                    "data-tip": `${value.count} treino(s) em ${value.date}`,
                };
            }}
        />
    );
}
