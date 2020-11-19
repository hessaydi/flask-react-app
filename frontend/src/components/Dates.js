import React from "react";
import { List, Header } from "semantic-ui-react";
export const Dates = ({ dates }) => {
  return (
      <List>
        {dates.map(date => {
          return (
            <List.Item key={date.id}>
              <Header>{date.date_start} | {date.date_end} | {date.diffrence}</Header>
            </List.Item>
          );
        })}
      </List>
  );
};
