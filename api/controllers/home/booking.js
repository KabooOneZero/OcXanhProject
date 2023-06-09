const connection = require("../../database/database");

// Select all kind of services of services have id
const getBooking = (req, res) => {
  const q =
    "SELECT booking.id, service_details.name, cleaning_time, cleaning_date, address, status " +
    "FROM cleaning_services.booking join service_details on booking.service_detail_id = service_details.id " +
    "where user_id = ?";

  connection.query(q, [req.params.user_id], (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};

const postBooking = (req, res) => {
  const {
    user_id,
    service_detail_id,
    cleaner_id,
    payment_id,
    cleaning_date,
    cleaning_time,
    address,
    contact_name,
    contact_phone,
    contact_email,
  } = req.body;

  const query =
    "INSERT INTO `cleaning_services`.`booking` (`user_id`, `service_detail_id`, `cleaner_id`,`payment_id`, `cleaning_date`, `cleaning_time`, `address`, `contact_name`, `contact_phone`,`contact_email`,`status`) VALUES (?,?,?,?,?,?,?,?,?,?,0)";
  connection.query(
    query,
    [
      user_id,
      service_detail_id,
      cleaner_id,
      payment_id,
      cleaning_date,
      cleaning_time,
      address,
      contact_name,
      contact_phone,
      contact_email,
    ],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Request send successfully");
    }
  );
};
// Delete multiple
const deleteBooking = (req, res) => {
  const id = req.body.id;
  const query = "DELETE FROM booking WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete records" });
    } else {
      res.status(200).json({ message: "Records deleted successfully" });
    }
  });
};
module.exports = {
  getBooking,
  //   getCleaner,
  postBooking,
  deleteBooking,
  //   updateService,
};
