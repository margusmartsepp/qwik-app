export const formatTimestamp = (timestamp: number): string => {
    return new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }).format(new Date(timestamp));
  };