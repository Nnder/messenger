import dayjs from "dayjs";

const lastMessageTime = (seconds: number): string => {
  const now = dayjs();
  const unixSecons = dayjs.unix(seconds);
  const date: string =
    now.unix() - 86400 < unixSecons.unix()
      ? unixSecons.format("HH:mm")
      : unixSecons.format("DD/MM/YYYY");
  return date;
};

export default lastMessageTime;
