export default function DateTimeConverter(rawValue) {
  return new Date(rawValue).toDateString();
}
