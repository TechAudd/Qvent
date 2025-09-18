import { useEffect, useState } from "react";
import MuLogo from "../media/Images/logo.png";
import qTapLogo from "../media/Images/qtapBanner.png";
import StudentLogo from "../media/Images/studentLogo.png";

const MainEventPage = () => {
  const [events, setEvents] = useState([
    { event_id: 1, name: "New Year" },
    { event_id: 2, name: "Holiday" },
  ]);
  const [eventId, setEventId] = useState("");
  const [htno, setHtno] = useState("");
  const [studentFetchLoading, setStudentFetchLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState();

  const getEvents = async () => {};

  useEffect(() => {
    getEvents();
  }, []);

  const getLogo = () => {
    return `https://musecportal.s3.ap-south-1.amazonaws.com/${
      studentInfo?.batch
    }/${studentInfo?.htno?.toLowerCase()}.jpg`;
  };

  const onClickGetStudentStatus = async () => {
    try {
      setStudentFetchLoading(true);
      //   const response = await dashboardServices.getStudentInfo(eventId, htno);

      setStudentInfo({
        htno: "SE25UARI006",
        name: "Upanshu  Madugula",
        program: "B. Tech",
        batch: "2025",
        registered: false,
        reg_type: null,
        checked_in: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setStudentFetchLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white rounded-xl shadow-sm px-6 py-4 mb-4">
        <img src={MuLogo} className="h-12 w-auto" alt="MU Logo" />
        <img src={qTapLogo} className="h-8 w-auto" alt="QTap Logo" />
      </header>

      {/* Content */}
      <div className="flex gap-4 h-[calc(100vh-100px)]">
        {/* Left Panel */}
        <div className="w-[30%] flex flex-col gap-4">
          {/* Event Selector */}
          <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Event
            </label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full p-2 focus:border-blue-500 focus:ring-blue-500 border-gray-300  text-sm"
            >
              <option value="">Choose an Event</option>
              {events.map((event) => (
                <option key={event.event_id} value={event.event_id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hall Ticket Search */}
          {eventId !== "" && (
            <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Hall Ticket Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Hallticket Number"
                  value={htno}
                  onChange={(e) => setHtno(e.target.value)}
                  className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={onClickGetStudentStatus}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        {/* Right Panel */}
        <div className="w-[70%] bg-white rounded-xl shadow-sm p-8 flex items-center justify-center">
          {eventId === "" ? (
            <p className="text-center text-gray-400 text-sm">
              Please select an event to get started
            </p>
          ) : studentFetchLoading ? (
            <p className="text-center text-gray-500 text-sm animate-pulse">
              Fetching student details...
            </p>
          ) : studentInfo ? (
            <div className="w-full max-w-2xl border rounded-xl shadow-sm bg-gray-50 p-8">
              {/* Header Section */}
              <div className="flex items-center gap-6 border-b pb-6 mb-6">
                <img
                  src={getLogo()}
                  alt="Student Photo"
                  className="w-28 h-28 rounded-lg object-cover border"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // prevents infinite loop if default also fails
                    e.currentTarget.src = StudentLogo;
                  }}
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {studentInfo.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {studentInfo.program} • Batch {studentInfo.batch}
                  </p>
                </div>
              </div>

              {/* Details Section */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-700">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">
                    Hall Ticket
                  </p>
                  <p className="font-medium">{studentInfo.htno}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">
                    Registration
                  </p>
                  <p
                    className={`font-medium ${
                      studentInfo.registered ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {studentInfo.registered ? "Registered" : "Not Registered"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">
                    Check-In
                  </p>
                  <p
                    className={`font-medium ${
                      studentInfo.checked_in ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {studentInfo.checked_in ? "Checked In" : "Not Checked In"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">
                    Registration Type
                  </p>
                  <p className="font-medium">
                    {studentInfo.reg_type ? studentInfo.reg_type : "-"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400 text-sm">
              Enter a Hall Ticket Number and click Submit
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainEventPage;
