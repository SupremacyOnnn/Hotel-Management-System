export const findRoomsOverlapDates = (bookings) => {
  const roomIdsWithOverlap = [];

  // Iterate through each booking
  bookings.forEach((booking, index) => {
    const { startDate: startDate1, endDate: endDate1 } = booking;
    roomIdsWithOverlap.push({
      roomId: booking.roomId,
      quantity: booking.quantity,
    });

    // Convert startDate and endDate strings to Date objects
    const startDate1Obj = new Date(startDate1);
    const endDate1Obj = new Date(endDate1);

    // Compare this booking with all other bookings to find overlapping dates
    for (let i = index + 1; i < bookings.length; i++) {
      if (booking.roomId == booking[i].roomId) {
        const { startDate: startDate2, endDate: endDate2 } = bookings[i];
        const startDate2Obj = new Date(startDate2);
        const endDate2Obj = new Date(endDate2);
        if (
          (startDate1Obj <= endDate2Obj && startDate2Obj <= endDate1Obj) ||
          (startDate2Obj <= endDate1Obj && startDate1Obj <= endDate2Obj)
        ) {
          if (roomIdsWithOverlap.quantity < booking[i].quantity) {
            roomIdsWithOverlap.quantity = booking[i].quantity;
          }
          bookings.splice(i, 1);
          i--;
        }
      }
    }
    return roomIdsWithOverlap;
  });

  // Convert the Set to an array and return
  return Array.from(roomIdsWithOverlap);
};
