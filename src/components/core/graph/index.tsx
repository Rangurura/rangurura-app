"use client";
import { Card, DonutChart, Title } from "@tremor/react";

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

const days = [
  {
    name: "Mon",
    color: "#FAD201",
  },
  {
    name: "Tue",
    color: "#20603D",
  },
  {
    name: "Wed",
    color: "#F48150",
  },
  {
    name: "Thu",
    color: "#0E86B4",
  },
  {
    name: "Fri",
    color: "#E109F4",
  },
  {
    name: "Sat",
    color: "#2B48AF",
  },
  {
    name: "Sun",
    color: "#FAD201",
  },
];

const valueFormatter = (number: number) =>
  ` ${new Intl.NumberFormat("us").format(number).toString()}`;

export default function Graph() {
  return (
    <div className="w-full flex items-center">
      <DonutChart
        className="mt-6 w-full"
        data={cities}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        // colors={["#FF0000", "#00FF00", "#F48150", "#0E86B4", "#E109F4", "#2B48AF", "#FAD201"]}
        colors={[]}
      />

      <div className="flex flex-col gap-4 justify-center mr-9 mt-3">
        {days.map((day: { name: string; color: string }, i: number) => (
          <div key={i} className="flex items-center justify-start gap-3">
            <span
              className="w-5 h-5 rounded-sm"
              style={{ backgroundColor: day.color }}
            ></span>
            <h6 className="text-[80%] font-bold">{day.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
