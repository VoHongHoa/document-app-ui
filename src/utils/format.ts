import moment from "moment";
export function formatDate(date: Date): String {
  return moment(date).format("YYYY-MM-DD");
}

export function formatTimeAgo(date: Date): String {
  console.log(date);
  return moment(date).fromNow();
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
