import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CreateEvent from "./createEvent";
import { useSession } from "next-auth/client";
import Layout from "../components/Layout";
import EventsList from "../components/home/EventsList";
import "bootstrap/dist/css/bootstrap.min.css";

const requests = require("../handlers/requests");

export default function Home() {
  // User Hooks
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState();
  const [host, setHost] = useState(false);
  const [session, loading] = useSession();

  // Event Hooks
  const [userEvents, setUserEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  // Search Hooks
  const [search, setSearch] = useState("");
  const [compareEvents, setCompareEvents] = useState([]);

  useEffect(() => {
    if (session) {
      requests.getUserProfile(session.user.email, (data) => {
        setUserName(data[0].name);
        setUserId(data[0].id);
        setHost(data[0].host_status);
      });

      if (userId) {
        requests.fetchUserEvents(userId, (data) => {
          setUserEvents(data);
        });
      }

      requests.fetchAllEvents((data) => {
        setAllEvents(data);
        setCompareEvents(data);
      });
    }
  }, [session]);

  // Search Function
  useEffect(() => {
    if (search.length === 0) {
      setAllEvents(compareEvents);
    } else {
      let searchTerm = search.toLowerCase();
      let searchResults = [];
      compareEvents.forEach((event) => {
        for (let key in event) {
          let property = event[key];
          if (typeof property === "string") {
            property = property.toLowerCase();
            if (
              property.includes(searchTerm) &&
              searchResults.indexOf(event) === -1
            ) {
              searchResults.push(event);
            }
          }
        }
      });
      setAllEvents(searchResults);
    }
  }, [search]);

  // Wrap every page component in <Layout> tags (and import up top)
  // to have the nav bar up top
  return (
    <Layout userId={userId} setSearch={setSearch} host={host}>
      <div className={styles.container}>
        <Head>
          <title>My Dashboard</title>
        </Head>

        <div className={styles.main}>
          <div>
            <h5>All Events</h5>
            <div className="event-list">
              <EventsList events={allEvents} userId={userId} host={host}/>
            </div>
          </div>
        </div>
        <footer className={styles.footer}></footer>
      </div>
    </Layout>
  );
}
