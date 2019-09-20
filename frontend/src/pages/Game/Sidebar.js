import React from "react";
import Icon from "react-eva-icons";

import avatarMale1 from "../../static/img/avatars/avatar-male-1.jpg";

import friends from "./friends";
import discussions from "./discussions";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container">
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="conversations"
            role="tabpanel"
          >
            <div className="top">
              <form>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                />
                <button type="submit" className="btn prepend">
                  <Icon name="search" size="medium" />
                </button>
              </form>
              <ul className="nav" role="tablist">
                <li>
                  <a
                    href="#direct"
                    className="filter-btn active"
                    data-toggle="tab"
                    data-filter="direct"
                  >
                    Direct
                  </a>
                </li>
                <li>
                  <a
                    href="#groups"
                    className="filter-btn"
                    data-toggle="tab"
                    data-filter="groups"
                  >
                    Groups
                  </a>
                </li>
              </ul>
            </div>
            <div className="middle">
              <h4>Discussions</h4>
              <button
                type="button"
                className="btn round"
                data-toggle="modal"
                data-target="#compose"
              >
                <Icon name="edit-2" size="medium" />
              </button>
              <hr />
              <ul className="nav discussions" role="tablist">
                {discussions
                  ? discussions.map((idx, discussion) => {
                      return (
                        <li key={idx}>
                          <a
                            href="#"
                            className={`filter ${discussion.type} ${
                              !!discussion.isActive ? "active" : ""
                            }`}
                            data-chat="open"
                            data-toggle="tab"
                            role="tab"
                            aria-controls="chat1"
                            aria-selected="true"
                          >
                            <div
                              className={`status ${
                                !!discussion.status ? "online" : "offline"
                              }`}
                            >
                              <img src={discussion.img} alt="avatar" />
                              <Icon name="radio-button-on" size="medium" />
                            </div>
                            <div className="content">
                              <div className="headline">
                                <h5>{discussion.name}</h5>
                                <span>{discussion.messageSentDate}</span>
                              </div>
                              <p>{discussion.lastText}</p>
                            </div>
                          </a>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
          <div className="tab-pane fade" id="friends" role="tabpanel">
            <div className="top">
              <form>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                />
                <button type="submit" className="btn prepend">
                  <Icon name="search" size="medium" />
                </button>
              </form>
            </div>
            <div className="middle">
              <h4>Friends</h4>
              <hr />
              <ul className="users">
                {friends
                  ? friends.map((idx, friend) => {
                      return (
                        <li key={idx}>
                          <a href="#">
                            <div className="status online">
                              <img src={friend.img} alt="avatar" />
                              <Icon name="radio-button-on" size="medium" />
                            </div>
                            <div className="content">
                              <h5>{friend.name}</h5>
                              <span>{friend.location}</span>
                            </div>
                            <div className="icon">
                              <Icon name="person" size="medium" />
                            </div>
                          </a>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
          <div className="tab-pane fade" id="notifications" role="tabpanel">
            <div className="top">
              <form>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                />
                <button type="submit" className="btn prepend">
                  <i data-eva="search"></i>
                </button>
              </form>
            </div>
            <div className="middle">
              <h4>Notifications</h4>
              <hr />
              <ul className="notifications">
                <li>
                  <div className="round">
                    <i data-eva="person-done"></i>
                  </div>
                  <p>
                    Quincy has joined to <strong>Squad Ghouls</strong> group.
                  </p>
                </li>
                <li>
                  <div className="round">
                    <i data-eva="lock"></i>
                  </div>
                  <p>You need change your password for security reasons.</p>
                </li>
                <li>
                  <div className="round">
                    <i data-eva="attach"></i>
                  </div>
                  <p>
                    Mark attached the file <strong>workbox.js</strong>.
                  </p>
                </li>
                <li>
                  <div className="icon round">
                    <i data-eva="gift"></i>
                  </div>
                  <p>Sara has a birthday today. Wish her all the best.</p>
                </li>
                <li>
                  <div className="round">
                    <i data-eva="person"></i>
                  </div>
                  <p>Sanne has accepted your friend request.</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="settings tab-pane fade" id="settings" role="tabpanel">
            <div className="user">
              <label>
                <input type="file" />
                <img src={avatarMale1} alt="avatar" />
              </label>
              <div className="content">
                <h5>Ham Chuwon</h5>
                <span>Florida, US</span>
              </div>
            </div>
            <h4>Settings</h4>
            <ul id="preferences">
              <li>
                <a
                  href="#"
                  className="headline"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#account"
                  aria-controls="account"
                >
                  <div className="title">
                    <h5>Account</h5>
                    <p>Update your profile details</p>
                  </div>
                  <i data-eva="arrow-ios-forward"></i>
                  <i data-eva="arrow-ios-downward"></i>
                </a>
                <div
                  className="content collapse"
                  id="account"
                  data-parent="#preferences"
                >
                  <div className="inside">
                    <form className="account">
                      <div className="form-row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First name"
                              value="Ham"
                              onChange={() => {}}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last name"
                              value="Chuwon"
                              onChange={() => {}}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email address"
                          value="hamchuwon@gmail.com"
                          onChange={() => {}}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter your password"
                          value="123456"
                          onChange={() => {}}
                        />
                      </div>
                      <div className="form-group">
                        <label>Biography</label>
                        <textarea
                          className="form-control"
                          placeholder="Tell us a little about yourself"
                        ></textarea>
                      </div>
                      <button type="submit" className="btn primary">
                        Save settings
                      </button>
                    </form>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="headline"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#privacy"
                  aria-controls="privacy"
                >
                  <div className="title">
                    <h5>Privacy & Safety</h5>
                    <p>Control your privacy settings</p>
                  </div>
                  <i data-eva="arrow-ios-forward"></i>
                  <i data-eva="arrow-ios-downward"></i>
                </a>
                <div
                  className="content collapse"
                  id="privacy"
                  data-parent="#preferences"
                >
                  <div className="inside">
                    <ul className="options">
                      <li>
                        <div className="headline">
                          <h5>Safe Mode</h5>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onChange={() => {}}
                              checked
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </li>
                      <li>
                        <div className="headline">
                          <h5>History</h5>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onChange={() => {}}
                              checked
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </li>
                      <li>
                        <div className="headline">
                          <h5>Camera</h5>
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </li>
                      <li>
                        <div className="headline">
                          <h5>Microphone</h5>
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="headline"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#alerts"
                  aria-controls="alerts"
                >
                  <div className="title">
                    <h5>Notifications</h5>
                    <p>Turn notifications on or off</p>
                  </div>
                  <i data-eva="arrow-ios-forward"></i>
                  <i data-eva="arrow-ios-downward"></i>
                </a>
                <div
                  className="content collapse"
                  id="alerts"
                  data-parent="#preferences"
                >
                  <div className="inside">
                    <ul className="options">
                      <li>
                        <div className="headline">
                          <h5>Pop-up</h5>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onChange={() => {}}
                              checked
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </li>
                      <li>
                        <div className="headline">
                          <h5>Vibrate</h5>
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </li>
                      <li>
                        <div className="headline">
                          <h5>Sound</h5>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onChange={() => {}}
                              checked
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </li>
                      <li>
                        <div className="headline">
                          <h5>Lights</h5>
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="headline"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#integrations"
                  aria-controls="integrations"
                >
                  <div className="title">
                    <h5>Integrations</h5>
                    <p>Sync your social accounts</p>
                  </div>
                  <i data-eva="arrow-ios-forward"></i>
                  <i data-eva="arrow-ios-downward"></i>
                </a>
                <div
                  className="content collapse"
                  id="integrations"
                  data-parent="#preferences"
                >
                  <div className="inside">
                    <ul className="integrations">
                      <li>
                        <button className="btn round">
                          <i data-eva="google"></i>
                        </button>
                        <div className="content">
                          <div className="headline">
                            <h5>Google</h5>
                            <label className="switch">
                              <input
                                type="checkbox"
                                onChange={() => {}}
                                checked
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <span>Read, write, edit</span>
                        </div>
                      </li>
                      <li>
                        <button className="btn round">
                          <i data-eva="facebook"></i>
                        </button>
                        <div className="content">
                          <div className="headline">
                            <h5>Facebook</h5>
                            <label className="switch">
                              <input
                                type="checkbox"
                                onChange={() => {}}
                                checked
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <span>Read, write, edit</span>
                        </div>
                      </li>
                      <li>
                        <button className="btn round">
                          <i data-eva="twitter"></i>
                        </button>
                        <div className="content">
                          <div className="headline">
                            <h5>Twitter</h5>
                            <label className="switch">
                              <input type="checkbox" />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <span>No permissions set</span>
                        </div>
                      </li>
                      <li>
                        <button className="btn round">
                          <i data-eva="linkedin"></i>
                        </button>
                        <div className="content">
                          <div className="headline">
                            <h5>LinkedIn</h5>
                            <label className="switch">
                              <input type="checkbox" />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <span>No permissions set</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="headline"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#appearance"
                  aria-controls="appearance"
                >
                  <div className="title">
                    <h5>Appearance</h5>
                    <p>Customize the look of Swipe</p>
                  </div>
                  <i data-eva="arrow-ios-forward"></i>
                  <i data-eva="arrow-ios-downward"></i>
                </a>
                <div
                  className="content collapse"
                  id="appearance"
                  data-parent="#preferences"
                >
                  <div className="inside">
                    <ul className="options">
                      <li>
                        <div className="headline">
                          <h5>Lights</h5>
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round mode"></span>
                          </label>
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
