function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB');
}
    export default formatDate;