import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import UserBids from "./UserBids";
import { useSelector } from "react-redux";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="px-6">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flex flex-col w-1/3">
            <span>
              <b className="pr-2">Name: </b> {user.name}
            </span>
            <span>
              <b className="pr-2">Email:</b> {user.email}
            </span>
            <span>
              <b className="pr-2"> Member Since:</b>
              {moment(user.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
