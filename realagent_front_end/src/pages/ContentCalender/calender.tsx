import React, { useState } from "react";
import {
  Card,
  Flex,
  Text,
  SimpleGrid,
  Box,
  Badge,
  Button,
  Divider,
  Modal,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaTiktok } from "react-icons/fa";

// Mock function to fetch posts for the selected date
const fetchPostsForDate = (date: string) => {
  return [
    { 
      id: 1, 
      description: "Rising Rates? Savvy San Diego Homebuyers Are Using Discount Points! With mortgage rates on the rise, more San Diego homebuyers are turning to discount points to secure a lower interest rate. Are you thinking about buying?",
      time: "12:30 PM", 
      hashtags: "#hashtag1 #hashtag2",
      imageUrl: "/public/post.jpg",
      selectedIcon: "heart", // Default icon for example
      date,
    },
    {
      id: 2, 
      description: "Homebuyers are finding creative ways to beat rising rates. Are discount points the right choice for you?",
      time: "1:00 PM", 
      hashtags: "#hashtag3 #hashtag4",
      imageUrl: "/public/post.jpg",
      selectedIcon: "heart", // Default icon for example
      date,
    },
  ];
};

const generateCalendar = (month: number, year: number) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const offsetStart = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const calendarDays: { date: number; isCurrentMonth: boolean }[] = [];

  // Fill previous month's days
  for (let i = offsetStart - 1; i >= 0; i--) {
    calendarDays.push({ date: daysInPrevMonth - i, isCurrentMonth: false });
  }

  // Fill current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ date: i, isCurrentMonth: true });
  }

  // Fill trailing dates
  const trailingDates = 35 - calendarDays.length; // Adjust to fit a 7x5 grid
  for (let i = 1; i <= trailingDates; i++) {
    calendarDays.push({ date: i, isCurrentMonth: false });
  }

  return calendarDays;
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [opened, setOpened] = useState(false); // Modal open/close state
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Selected date for posts
  const [posts, setPosts] = useState<any[]>([]); // List of posts for the selected date
  const [selectedPost, setSelectedPost] = useState<any | null>(null); // Post selected for detailed view
  const [detailedModalOpened, setDetailedModalOpened] = useState(false); // Detailed post modal state
  const [editModalOpened, setEditModalOpened] = useState(false); // Edit modal state
  const [editDescription, setEditDescription] = useState(""); // Edited description
  const [editHashtags, setEditHashtags] = useState(""); // Edited hashtags
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]); // Array of selected icons for the post
  const [iconVisible, setIconVisible] = useState(false);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const calendarDates = generateCalendar(currentMonth, currentYear);

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newMonth = prev.getMonth() + (direction === "next" ? 1 : -1);
      return new Date(prev.getFullYear(), newMonth, 1);
    });
  };

  const resetToToday = () => setCurrentDate(new Date());

  const handleDateClick = (date: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = date.toString().padStart(2, "0");
      const formattedDate = `${currentDate.getFullYear()}-${month}-${day}`;
      setSelectedDate(formattedDate);

      // Fetch posts for the selected date
      const fetchedPosts = fetchPostsForDate(formattedDate);
      setPosts(fetchedPosts);

      setOpened(true); // Open the modal
    }
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setDetailedModalOpened(true); // Open the detailed post modal
    setOpened(false); // Close the first modal
  };

  const handleEditClick = () => {
    if (selectedPost) {
      setEditDescription(selectedPost.description);
      setEditHashtags(selectedPost.hashtags);
      setSelectedIcons(selectedPost.selectedIcon);
      setEditModalOpened(true); // Open edit modal
      setDetailedModalOpened(false); // Close the detailed modal
    }
  };

  const handleIconClick = (icon: string, post: any) => {
    setSelectedIcons((prevIcons) => {
      if (prevIcons.includes(icon)) {
        // If the icon is already selected, remove it
        return prevIcons.filter((selectedIcon) => selectedIcon !== icon);
      } else {
        // If the icon is not selected, add it
        return [...prevIcons, icon];
      }
    });

    // Open the next modal after clicking the icon (you can replace this with the modal logic)
    handlePostClick(post); // You can open your modal or handle other logic here
  };

  const handleSaveClick = () => {
    // Save edited values
    if (selectedPost) {
      selectedPost.description = editDescription;
      selectedPost.hashtags = editHashtags;
      selectedPost.selectedIcons = selectedIcons; // Save the selected icons
      setPosts([...posts]); // Update the posts state with the edited post
    }
    setEditModalOpened(false); // Close edit modal
    setOpened(true)
  };

  const handleCancelClick = () => {
    setEditModalOpened(false); // Close edit modal
    setDetailedModalOpened(false);
  };

  return (
    <Card
      radius="lg"
      shadow="sm"
      padding="16px"
      style={{ background: "#ffffff", flex: 1, display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <Flex justify="space-between" align="center" mb="16px">
        <Flex direction="column">
          <Text fw="bold" size="lg">
            Dan's Calendar
          </Text>
          <Text size="sm" color="dimmed">
            View and manage all your calendar events
          </Text>
        </Flex>
        <Text size="sm" color="dimmed">
          Synced: example@gmail.com
        </Text>
      </Flex>
      <Divider my="sm" labelPosition="center" />

      {/* Calendar Controls */}
      <Flex justify="space-between" align="center" mb="16px">
        <Button size="xs" onClick={resetToToday}>
          Today
        </Button>
        <Flex align="center" gap="8px">
          <IconChevronLeft
            onClick={() => handleMonthChange("prev")}
            style={{ cursor: "pointer" }}
          />
          <Text>
            {currentDate.toLocaleString("default", { month: "long" })} {currentYear}
          </Text>
          <IconChevronRight
            onClick={() => handleMonthChange("next")}
            style={{ cursor: "pointer" }}
          />
        </Flex>
      </Flex>

      {/* Calendar Grid */}
      <SimpleGrid cols={7} spacing="sm" style={{ flex: 1 }}>
        {daysOfWeek.map((day) => (
          <Box
            key={day}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              padding: "0px",
              borderBottom: "1px solid #ddd",
            }}
          >
            {day}
          </Box>
        ))}
        {calendarDates.map((dateObj, index) => (
          <Box
            key={index}
            onClick={() => handleDateClick(dateObj.date, dateObj.isCurrentMonth)}
            style={{
              textAlign: "center",
              padding: "10px 8px",
              background: dateObj.isCurrentMonth ? "#fff" : "#f0f0f0",
              color: dateObj.isCurrentMonth ? "#000" : "#999",
              border: "1px solid #ddd",
              cursor: dateObj.isCurrentMonth ? "pointer" : "default",
              position: "relative",
            }}
          >
            <Text size="sm">{dateObj.date}</Text>
            {dateObj.isCurrentMonth && index % 5 === 0 && (
              <Badge color="green" variant="light" size="xs" mt="4px">
                Posted
              </Badge>
            )}
          </Box>
        ))}
      </SimpleGrid>

      <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        selectedDate ? (
          <Text fw="bold">
            {new Date(selectedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        ) : (
          "Invalid Date"
        )
      }
      size="xl"
      centered
    >
      <SimpleGrid cols={1} spacing="lg">
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                position: "relative", // To position the icon over the image
              }}
            >
              {/* Image Section */}
              <div
                style={{
                  position: "relative", // To position the icon within the image
                }}
                onMouseEnter={() => setIconVisible(true)} // Show icon when hover
                onMouseLeave={() => setIconVisible(false)} // Hide icon when mouse leaves
              >
                <img
                  src={post.imageUrl}
                  alt="Post Image"
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "8px",
                    marginRight: "16px",
                  }}
                />
                {iconVisible && (
                  <div
                    onClick={() => handleIconClick("facebook", post)} // Use your icon identifier and the post
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      borderRadius: "20%",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                  >
                    {/* Replace with your image icon */}
                    <img
                      src="/public/Frame 1000005495.png" // Replace with your actual icon image path
                      alt="icon"
                      style={{
                        width: "20px", // Adjust the size as needed
                        height: "20px",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Text Section */}
              <div style={{ flex: 1 }}>
                <Text size="sm">Description</Text>
                <Text mb="xs">{post.description}</Text>
                <Text size="sm">Hashtags</Text>
                <Text size="sm" color="dimmed" mb="xs">
                  {post.hashtags}
                </Text>
              </div>

              {/* Social Media Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  marginLeft: "auto",
                }}
              >
                {/* Time and Text */}
                <Text size="lg">Time: {post.time}</Text>
                <Text size="sm">Select Social Media</Text>

                {/* Social Media Icons */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "20%",
                      border: "2px solid blue",
                    }}
                  >
                    <FaFacebook size="18px" />
                  </div>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "20%",
                      border: "2px solid blue",
                    }}
                  >
                    <FaInstagram size="18px" />
                  </div>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "20%",
                      border: "2px solid blue",
                    }}
                  >
                    <FaLinkedin size="18px" />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            {index < posts.length - 1 && <Divider my="lg" />}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </Modal>

      <Modal
        opened={detailedModalOpened}
        onClose={handleCancelClick}
        title={null}
        size="lg"
        centered
        styles={{
          content: {
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
            maxWidth: "450px",
          },
        }}
      >
        {selectedPost && (
          <div style={{ width: "100%" }}>
            {/* Post Image */}
            <img
              src={selectedPost.imageUrl}
              alt="Detailed Post Image"
              style={{
                width: "50%",
                height: "120px",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
            {/* Date and Time */}
            <Text
              style={{
                fontSize: "14px",
                fontWeight: 500,
                marginTop: "16px",
                textAlign: "left",
                color: "#555",
              }}
            >
              Date:{" "}
              {selectedPost?.date
                ? new Date(selectedPost.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "No date selected"}{" "}
              | Time: {selectedPost?.time || "No time selected"}
            </Text>

            {/* Social Media Icons */}
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <Text
                size="sm"
                fw={500}
                style={{
                  marginBottom: "8px",
                  textAlign: "left",
                }}
              >
                Select social media
              </Text>
              <Flex gap="12px" style={{ justifyContent: "flex-start" }}>
                {["facebook", "instagram", "linkedin"].map((platform) => (
                  <div
                    key={platform}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "20%",
                      background: "#f0f8ff",
                      border: "2px solid #0077FF",
                    }}
                  >
                    {/* Replace this icon dynamically if needed */}
                    {platform === "facebook" && <FaFacebook size={20} />}
                    {platform === "instagram" && <FaInstagram size={20} />}
                    {platform === "linkedin" && <FaLinkedin size={20} />}
                  </div>
                ))}
              </Flex>
            </div>

            {/* Description */}
            <Text
              style={{
                marginTop: "16px",
                fontSize: "16px",
                fontWeight: 500,
                textAlign: "left",
                lineHeight: "1.5",
              }}
            >
              {selectedPost.description}
            </Text>

            {/* Hashtags */}
            <Text
              style={{
                marginTop: "8px",
                fontSize: "14px",
                color: "#888",
                textAlign: "left",
              }}
            >
              {selectedPost.hashtags}
            </Text>

            {/* Buttons */}
            <Flex justify="right" gap="8px" style={{ marginTop: "16px" }}>
              <Button
                variant="outline"
                onClick={handleCancelClick}
                styles={{
                  root: {
                    borderColor: "#ddd",
                    color: "#555",
                    fontSize: "14px",
                    padding: "8px 16px",
                    borderRadius: "20px",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditClick}
                styles={{
                  root: {
                    backgroundColor: "#0077FF",
                    color: "#fff",
                    fontSize: "14px",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: "#005bb5" },
                  },
                }}
              >
                Edit
              </Button>
            </Flex>
          </div>
        )}
      </Modal>

      {/* Edit Post Modal */}
      {/* Edit Post Modal */}
      <Modal
          opened={editModalOpened}
          onClose={handleCancelClick}
          title={
            <Text
              style={{
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
            </Text>
          }
          size="lg"
          centered
          styles={{
            content: {
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
              maxWidth: "400px", // Increase modal width if needed
              maxHeight: "100vh", // Ensure modal does not exceed 90% of the viewport height
              height: "95vh", // Set modal height to 80% of the viewport
              overflowY: "auto", // Make modal content scrollable
            },
            header: {
              fontWeight: "bold",
              fontSize: "20px",
              position: "sticky", // Keep header visible when scrolling
              top: 0,
              backgroundColor: "#f9f9f9",
              zIndex: 10,
            },
          }}
        >
          {/* Post Image */}
          <div style={{ display: "flex", justifyContent: "left", marginBottom: "16px" }}>
            <img
              src={selectedPost?.imageUrl}
              alt="Post Image"
              style={{
                width: "50%",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
          
          {/* Date and Time Fields */}
          <Flex gap="16px" mb="16px">
            <TextInput
              label="Date"
              value={selectedDate || ""}
              readOnly
              styles={{
                input: {
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#f0f0f0",
                  color: "#555",
                },
                label: { fontSize: "14px", fontWeight: 500 },
              }}
              style={{ flex: 1 }}
            />
            <TextInput
              label="Time"
              value={selectedPost?.time || ""}
              readOnly
              styles={{
                input: {
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#f0f0f0",
                  color: "#555",
                },
                label: { fontSize: "14px", fontWeight: 500 },
              }}
              style={{ flex: 1 }}
            />
          </Flex>

          {/* Social Media Icons */}
          <div style={{ marginBottom: "16px" }}>
            <Text size="sm" fw={500} style={{ marginBottom: "8px" }}>
              Select social media icons
            </Text>
            <Flex gap="12px" justify="center">
              {[
                { platform: "facebook", icon: <FaFacebook size={20} /> },
                { platform: "instagram", icon: <FaInstagram size={20} /> },
                { platform: "linkedin", icon: <FaLinkedin size={20} /> },
                { platform: "twitter", icon: <FaTwitter size={20} /> },
                { platform: "youtube", icon: <FaYoutube size={20} /> },
                { platform: "tiktok", icon: <FaTiktok size={20} /> },
              ].map(({ platform, icon }) => (
                <div
                  key={platform}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "20%",
                    cursor: "pointer",
                    border: selectedIcons.includes(platform)
                      ? "2px solid #0077FF"
                      : "2px solid #000", // Blue border when selected
                    background: selectedIcons.includes(platform)
                      ? "#f0f8ff"
                      : "transparent",
                  }}
                  onClick={() => handleIconClick(platform, posts)}
                >
                  {icon}

                  {selectedIcons.includes(platform) && (
                    <ActionIcon
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the icon click
                        setSelectedIcons((prev) => prev.filter((selectedIcon) => selectedIcon !== platform));
                      }}
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        border: "2px solid #0077FF", // Blue border around the X icon
                        padding: "2px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <IconX size={12} color="#0077FF" />
                    </ActionIcon>
                  )}
                </div>
              ))}
            </Flex>
          </div>


          {/* Edit Fields */}
          <TextInput
            label="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            styles={{
              input: {
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "12px",
                minHeight: "120px", // Increased description field height
              },
              label: { fontSize: "14px", fontWeight: 500 },
            }}
            mb="16px"
          />
          <TextInput
            label="Hashtags"
            value={editHashtags}
            onChange={(e) => setEditHashtags(e.target.value)}
            styles={{
              input: {
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "12px",
              },
              label: { fontSize: "14px", fontWeight: 500 },
            }}
            mb="16px"
          />

          {/* Buttons */}
          <Flex justify="center" gap="8px">
            <Button
              variant="outline"
              onClick={handleCancelClick}
              styles={{
                root: {
                  borderColor: "#ddd",
                  color: "#555",
                  fontSize: "14px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveClick}
              styles={{
                root: {
                  backgroundColor: "#0077FF",
                  color: "#fff",
                  fontSize: "14px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#005bb5" },
                },
              }}
            >
              Save
            </Button>
          </Flex>
        </Modal>

    </Card>
  );
};

export default Calendar;
