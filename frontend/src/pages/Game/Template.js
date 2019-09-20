import React from "react";

// components
import Icon from "react-eva-icons";

// Styles
import "../../static/css/lib/bootstrap.min.css";
import "./template.css";

// Static assets
import avatarMale1 from "../../static/img/avatars/avatar-male-1.jpg";
import avatarMale2 from "../../static/img/avatars/avatar-male-2.jpg";
import avatarMale3 from "../../static/img/avatars/avatar-male-3.jpg";
import avatarMale4 from "../../static/img/avatars/avatar-male-4.jpg";
import avatarMale5 from "../../static/img/avatars/avatar-male-5.jpg";
import avatarMale6 from "../../static/img/avatars/avatar-male-6.jpg";
import avatarFemale1 from "../../static/img/avatars/avatar-female-1.jpg";
import avatarFemale2 from "../../static/img/avatars/avatar-female-2.jpg";
import avatarFemale3 from "../../static/img/avatars/avatar-female-3.jpg";
import avatarGroup1 from "../../static/img/avatars/avatar-group-1.jpg";
import avatarGroup2 from "../../static/img/avatars/avatar-group-2.jpg";
import avatarGroup3 from "../../static/img/avatars/avatar-group-3.jpg";
import avatarGroup4 from "../../static/img/avatars/avatar-group-4.jpg";
import avatarGroup5 from "../../static/img/avatars/avatar-group-5.jpg";

const Template = () => {
  return (
    <div className="layout">
      <nav className="navigation">
        <div className="container">
          <ul className="nav" role="tablist">
            <li>
              <a
                href="#conversations"
                className="active"
                data-toggle="tab"
                role="tab"
                aria-controls="conversations"
                aria-selected="true"
              >
                <Icon
                  name="message-square"
                  size="medium"
                  animation={{
                    type: "pulse",
                    hover: true,
                    infinite: false
                  }}
                />
              </a>
            </li>
            <li>
              <a
                href="#friends"
                data-toggle="tab"
                role="tab"
                aria-controls="friends"
                aria-selected="false"
              >
                <Icon
                  name="people"
                  size="medium"
                  animation={{
                    type: "pulse",
                    hover: true,
                    infinite: false
                  }}
                />
              </a>
            </li>
            <li>
              <a
                href="#notifications"
                data-toggle="tab"
                role="tab"
                aria-controls="notifications"
                aria-selected="false"
              >
                <i data-eva="bell" data-eva-animation="pulse"></i>
              </a>
            </li>
            <li>
              <a
                href="#settings"
                data-toggle="tab"
                role="tab"
                aria-controls="settings"
                aria-selected="false"
              >
                <i data-eva="settings" data-eva-animation="pulse"></i>
              </a>
            </li>
            <li>
              <button type="button" className="btn mode">
                <i data-eva="bulb" data-eva-animation="pulse"></i>
              </button>
            </li>
            <li>
              <button type="button" className="btn">
                <img src={avatarMale1} alt="avatar" />
                <i data-eva="radio-button-on"></i>
              </button>
            </li>
          </ul>
        </div>
      </nav>
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
                  <li>
                    <a
                      href="#chat1"
                      className="filter direct active"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat1"
                      aria-selected="true"
                    >
                      <div className="status online">
                        <img src={avatarMale1} alt="avatar" />
                        <Icon name="radio-button-on" size="medium" />
                      </div>
                      <div className="content">
                        <div className="headline">
                          <h5>Ham Chuwon</h5>
                          <span>Today</span>
                        </div>
                        <p>Please review and sign the binding agreement.</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#chat1"
                      className="filter direct"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat1"
                      aria-selected="false"
                    >
                      <div className="status offline">
                        <img src={avatarMale2} alt="avatar" />
                        <Icon name="radio-button-on" size="medium" />
                      </div>
                      <div className="content">
                        <div className="headline">
                          <h5>Quincy Hensen</h5>
                          <span>Today</span>
                        </div>
                        <p>
                          Additional information about the previous clients.
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#chat1"
                      className="filter direct"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat1"
                      aria-selected="false"
                    >
                      <div className="status online">
                        <img src={avatarMale3} alt="avatar" />
                        <Icon name="radio-button-on" size="medium" />
                      </div>
                      <div className="content">
                        <div className="headline">
                          <h5>Mark Hog</h5>
                          <span>Feb 23</span>
                        </div>
                        <p>
                          I'm looking to get a quote for the move from LA to NY.
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#chat1"
                      className="filter direct"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat1"
                      aria-selected="false"
                    >
                      <div className="status offline">
                        <img src={avatarMale4} alt="avatar" />
                        <Icon name="radio-button-on" size="medium" />
                      </div>
                      <div className="content">
                        <div className="headline">
                          <h5>Sanne Viscaal</h5>
                          <span>Jan 18</span>
                        </div>
                        <p>
                          My delivery address is pending final confirmation.
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#chat1"
                      className="filter direct"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat1"
                      aria-selected="false"
                    >
                      <div className="status offline">
                        <img src={avatarMale5} alt="avatar" />
                        <Icon name="radio-button-on" size="medium" />
                      </div>
                      <div className="content">
                        <div className="headline">
                          <h5>Alex Just</h5>
                          <span>May 2</span>
                        </div>
                        <p>Sending all the requested insurance documents.</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#chat2"
                      className="filter groups"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat2"
                      aria-selected="false"
                    >
                      <div className="content">
                        <div className="headline">
                          <img src={avatarGroup1} alt="avatar" />
                          <h5>The Musketeers</h5>
                          <span>Today</span>
                        </div>
                        <p>Please review and sign the binding agreement.</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#chat2"
                      className="filter groups"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat2"
                      aria-selected="false"
                    >
                      <div className="content">
                        <div className="headline">
                          <img src={avatarGroup2} alt="avatar" />
                          <h5>Watts Up</h5>
                          <span>Today</span>
                        </div>
                        <p>
                          Additional information about the previous clients.
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#chat2"
                      className="filter groups"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat2"
                      aria-selected="false"
                    >
                      <div className="content">
                        <div className="headline">
                          <img src={avatarGroup3} alt="avatar" />
                          <h5>Memes</h5>
                          <span>Feb 23</span>
                        </div>
                        <p>
                          I'm looking to get a quote for the move from LA to NY.
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#chat2"
                      className="filter groups"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat2"
                      aria-selected="false"
                    >
                      <div className="content">
                        <div className="headline">
                          <img src={avatarGroup4} alt="avatar" />
                          <h5>Supernovas</h5>
                          <span>Jan 18</span>
                        </div>
                        <p>
                          My delivery address is pending final confirmation.
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#chat2"
                      className="filter groups"
                      data-chat="open"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat2"
                      aria-selected="false"
                    >
                      <div className="content">
                        <div className="headline">
                          <img src={avatarGroup5} alt="avatar" />
                          <h5>Squad Ghouls</h5>
                          <span>May 2</span>
                        </div>
                        <p>Sending all the requested insurance documents.</p>
                      </div>
                    </a>
                  </li>
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
                  <li>
                    <a href="#">
                      <div className="status online">
                        <img src={avatarMale1} alt="avatar" />
                        <Icon name="radio-button-on" size="medium" />
                      </div>
                      <div className="content">
                        <h5>Ham Chuwon</h5>
                        <span>Florida, US</span>
                      </div>
                      <div className="icon">
                        <Icon name="person" size="medium" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="status offline">
                        <img src={avatarMale2} alt="avatar" />
                        <Icon name="radio-button-on" size="medium" />
                      </div>
                      <div className="content">
                        <h5>Quincy Hensen</h5>
                        <span>Shanghai, China</span>
                      </div>
                      <div className="icon">
                        <Icon name="person" size="medium" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="status online">
                        <img src={avatarMale3} alt="avatar" />
                        <Icon name="radio-button-on" size="medium" />
                      </div>
                      <div className="content">
                        <h5>Mark Hog</h5>
                        <span>Olso, Norway</span>
                      </div>
                      <div className="icon">
                        <Icon name="person" size="medium" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="status offline">
                        <img src={avatarMale4} alt="avatar" />
                        <Icon name="radio-button-on" size="medium" />
                      </div>
                      <div className="content">
                        <h5>Sanne Viscaal</h5>
                        <span>Helena, Montana</span>
                      </div>
                      <div className="icon">
                        <i data-eva="person"></i>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="status offline">
                        <img src={avatarMale5} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Alex Just</h5>
                        <span>London, UK</span>
                      </div>
                      <div className="icon">
                        <i data-eva="person"></i>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="status online">
                        <img src={avatarMale6} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Arturo Thomas</h5>
                        <span>Vienna, Austria</span>
                      </div>
                      <div className="icon">
                        <i data-eva="person"></i>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="status offline">
                        <img src={avatarFemale1} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Victoria Garner</h5>
                        <span>Chisinau, Moldova</span>
                      </div>
                      <div className="icon">
                        <i data-eva="person"></i>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="status offline">
                        <img src={avatarFemale2} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Maria Baron</h5>
                        <span>Indore, India</span>
                      </div>
                      <div className="icon">
                        <i data-eva="person"></i>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="status online">
                        <img src={avatarFemale3} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Sara Koch</h5>
                        <span>Sofia, BG</span>
                      </div>
                      <div className="icon">
                        <i data-eva="person"></i>
                      </div>
                    </a>
                  </li>
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
            <div
              className="settings tab-pane fade"
              id="settings"
              role="tabpanel"
            >
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
      <div className="chat">
        <div className="tab-content">
          <div className="tab-pane fade show active" id="chat1" role="tabpanel">
            <div className="item">
              <div className="content">
                <div className="container">
                  <div className="top">
                    <div className="headline">
                      <img src={avatarMale3} alt="avatar" />
                      <div className="content">
                        <h5>Quincy Hensen</h5>
                        <span>Away</span>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <button type="button" className="btn">
                          <i data-eva="video" data-eva-animation="pulse"></i>
                        </button>
                      </li>
                      <li>
                        <button type="button" className="btn">
                          <i data-eva="phone" data-eva-animation="pulse"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn"
                          data-toggle="modal"
                          data-target="#compose"
                        >
                          <i
                            data-eva="person-add"
                            data-eva-animation="pulse"
                          ></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn"
                          data-utility="open"
                        >
                          <i data-eva="info" data-eva-animation="pulse"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn round"
                          data-chat="open"
                        >
                          <i data-eva="arrow-ios-back"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i
                            data-eva="more-vertical"
                            data-eva-animation="pulse"
                          ></i>
                        </button>
                        <div className="dropdown-menu">
                          <button type="button" className="dropdown-item">
                            <i data-eva="video"></i>Video call
                          </button>
                          <button type="button" className="dropdown-item">
                            <i data-eva="phone"></i>Voice call
                          </button>
                          <button
                            type="button"
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#compose"
                          >
                            <i data-eva="person-add"></i>Add people
                          </button>
                          <button
                            type="button"
                            className="dropdown-item"
                            data-utility="open"
                          >
                            <i data-eva="info"></i>Information
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="middle" id="scroll">
                  <div className="container">
                    <ul>
                      <li>
                        <img src={avatarMale3} alt="avatar" />
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </p>
                            </div>
                          </div>
                          <span>07:30am</span>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>Many desktop publishing packages.</p>
                            </div>
                          </div>
                          <span>11:56am</span>
                        </div>
                      </li>
                      <li>
                        <img src={avatarMale3} alt="avatar" />
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <div className="attachment">
                                <a href="#" className="round">
                                  <i data-eva="file-text"></i>
                                </a>
                                <div className="meta">
                                  <a href="#">
                                    <h5>build-plugins.js</h5>
                                  </a>
                                  <span>3kb</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <span>01:03pm</span>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>It was popularised in the 1960s.</p>
                            </div>
                          </div>
                          <span>05:42pm</span>
                        </div>
                      </li>
                      <li>
                        <img src={avatarMale3} alt="avatar" />
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>
                                It is a long established fact that a reader will
                                be distracted.
                              </p>
                            </div>
                          </div>
                          <span>08:20pm</span>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>
                                Contrary to popular belief, Lorem Ipsum is not
                                simply random text.
                              </p>
                            </div>
                          </div>
                          <span>
                            10:15pm <i data-eva="done-all"></i>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="container">
                  <div className="bottom">
                    <form>
                      <textarea
                        className="form-control"
                        placeholder="Type message..."
                        rows="1"
                      ></textarea>
                      <button type="submit" className="btn prepend">
                        <i data-eva="paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="utility">
                <div className="container">
                  <button type="button" className="close" data-utility="open">
                    <i data-eva="close"></i>
                  </button>
                  <button
                    type="button"
                    className="btn primary"
                    data-toggle="modal"
                    data-target="#compose"
                  >
                    Add people
                  </button>
                  <ul className="nav" role="tablist">
                    <li>
                      <a
                        href="#users"
                        className="active"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="users"
                        aria-selected="true"
                      >
                        Users
                      </a>
                    </li>
                    <li>
                      <a
                        href="#files"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="files"
                        aria-selected="false"
                      >
                        Files
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade active show"
                      id="users"
                      role="tabpanel"
                    >
                      <h4>Users</h4>
                      <hr />
                      <ul className="users">
                        <li>
                          <div className="status online">
                            <img src={avatarMale1} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Ham Chuwon</h5>
                            <span>Florida, US</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status offline">
                            <img src={avatarMale2} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Quincy Hensen</h5>
                            <span>Shanghai, China</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status online">
                            <img src={avatarMale3} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Mark Hog</h5>
                            <span>Olso, Norway</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status offline">
                            <img src={avatarMale4} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Sanne Viscaal</h5>
                            <span>Helena, Montana</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status offline">
                            <img src={avatarMale5} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Alex Just</h5>
                            <span>London, UK</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status online">
                            <img src={avatarMale6} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Arturo Thomas</h5>
                            <span>Vienna, Austria</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-pane fade" id="files" role="tabpanel">
                      <h4>Files</h4>
                      <div className="upload">
                        <label>
                          <input type="file" />
                          <span>Drag & drop files here</span>
                        </label>
                      </div>
                      <ul className="files">
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="file-text"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale1} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>workbox.js</h5>
                            </a>
                            <span>2kb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="folder"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale2} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>bug_report</h5>
                            </a>
                            <span>1kb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="briefcase"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale3} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>nuget.zip</h5>
                            </a>
                            <span>7mb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="image-2"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale4} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>clearfix.jpg</h5>
                            </a>
                            <span>1kb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="folder"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale5} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>package</h5>
                            </a>
                            <span>4mb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="file-text"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale6} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>plugins.js</h5>
                            </a>
                            <span>3kb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="chat2" role="tabpanel">
            <div className="item">
              <div className="content">
                <div className="container">
                  <div className="top">
                    <div className="headline">
                      <img src={avatarGroup1} alt="avatar" />
                      <div className="content">
                        <h5>The Musketeers</h5>
                        <span>Group discussion</span>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <button type="button" className="btn">
                          <i data-eva="video" data-eva-animation="pulse"></i>
                        </button>
                      </li>
                      <li>
                        <button type="button" className="btn">
                          <i data-eva="phone" data-eva-animation="pulse"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn"
                          data-toggle="modal"
                          data-target="#compose"
                        >
                          <i
                            data-eva="person-add"
                            data-eva-animation="pulse"
                          ></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn"
                          data-utility="open"
                        >
                          <i data-eva="info" data-eva-animation="pulse"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn round"
                          data-chat="open"
                        >
                          <i data-eva="arrow-ios-back"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i
                            data-eva="more-vertical"
                            data-eva-animation="pulse"
                          ></i>
                        </button>
                        <div className="dropdown-menu">
                          <button type="button" className="dropdown-item">
                            <i data-eva="video"></i>Video call
                          </button>
                          <button type="button" className="dropdown-item">
                            <i data-eva="phone"></i>Voice call
                          </button>
                          <button
                            type="button"
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#compose"
                          >
                            <i data-eva="person-add"></i>Add people
                          </button>
                          <button
                            type="button"
                            className="dropdown-item"
                            data-utility="open"
                          >
                            <i data-eva="info"></i>Information
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="middle">
                  <div className="container">
                    <ul>
                      <li>
                        <img src={avatarMale3} alt="avatar" />
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </p>
                            </div>
                          </div>
                          <span>07:30am</span>
                        </div>
                      </li>
                      <li>
                        <img src={avatarMale5} alt="avatar" />
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>Many desktop publishing packages.</p>
                            </div>
                          </div>
                          <span>11:56am</span>
                        </div>
                      </li>
                      <li>
                        <img src={avatarMale3} alt="avatar" />
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>
                                It has survived not only five centuries, but
                                also the leap into electronic typesetting.
                              </p>
                            </div>
                          </div>
                          <span>01:03pm</span>
                        </div>
                      </li>
                      <li>
                        <img src={avatarMale5} alt="avatar" />
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>It was popularised in the 1960s.</p>
                            </div>
                          </div>
                          <span>05:42pm</span>
                        </div>
                      </li>
                      <li>
                        <img src={avatarMale3} alt="avatar" />
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>
                                It is a long established fact that a reader will
                                be distracted.
                              </p>
                            </div>
                          </div>
                          <span>08:20pm</span>
                        </div>
                      </li>
                      <li>
                        <img src={avatarMale5} alt="avatar" />
                        <div className="content">
                          <div className="message">
                            <div className="bubble">
                              <p>
                                Contrary to popular belief, Lorem Ipsum is not
                                simply random text.
                              </p>
                            </div>
                          </div>
                          <span>
                            10:15pm <i data-eva="done-all"></i>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="container">
                  <div className="bottom">
                    <form>
                      <textarea
                        className="form-control"
                        placeholder="Type message..."
                        rows="1"
                      ></textarea>
                      <button type="submit" className="btn prepend">
                        <i data-eva="paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="utility">
                <div className="container">
                  <button type="button" className="close" data-utility="open">
                    <i data-eva="close"></i>
                  </button>
                  <button
                    type="button"
                    className="btn primary"
                    data-toggle="modal"
                    data-target="#compose"
                  >
                    Add people
                  </button>
                  <ul className="nav" role="tablist">
                    <li>
                      <a
                        href="#users2"
                        className="active"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="users2"
                        aria-selected="true"
                      >
                        Users
                      </a>
                    </li>
                    <li>
                      <a
                        href="#files2"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="files2"
                        aria-selected="false"
                      >
                        Files
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade active show"
                      id="users2"
                      role="tabpanel"
                    >
                      <h4>Users</h4>
                      <hr />
                      <ul className="users">
                        <li>
                          <div className="status online">
                            <img src={avatarMale1} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Ham Chuwon</h5>
                            <span>Florida, US</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status offline">
                            <img src={avatarMale2} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Quincy Hensen</h5>
                            <span>Shanghai, China</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status online">
                            <img src={avatarMale3} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Mark Hog</h5>
                            <span>Olso, Norway</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status offline">
                            <img src={avatarMale4} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Sanne Viscaal</h5>
                            <span>Helena, Montana</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status offline">
                            <img src={avatarMale5} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Alex Just</h5>
                            <span>London, UK</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="status online">
                            <img src={avatarMale6} alt="avatar" />
                            <i data-eva="radio-button-on"></i>
                          </div>
                          <div className="content">
                            <h5>Arturo Thomas</h5>
                            <span>Vienna, Austria</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-pane fade" id="files2" role="tabpanel">
                      <h4>Files</h4>
                      <div className="upload">
                        <label>
                          <input type="file" />
                          <span>Drag & drop files here</span>
                        </label>
                      </div>
                      <ul className="files">
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="file-text"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale1} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>workbox.js</h5>
                            </a>
                            <span>2kb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="folder"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale2} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>bug_report</h5>
                            </a>
                            <span>1kb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="briefcase"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale3} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>nuget.zip</h5>
                            </a>
                            <span>7mb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="image-2"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale4} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>clearfix.jpg</h5>
                            </a>
                            <span>1kb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="folder"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale5} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>package</h5>
                            </a>
                            <span>4mb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <ul className="avatars">
                            <li>
                              <button className="btn round">
                                <i data-eva="file-text"></i>
                              </button>
                            </li>
                            <li>
                              <a href="#">
                                <img src={avatarMale6} alt="avatar" />
                              </a>
                            </li>
                          </ul>
                          <div className="meta">
                            <a href="#">
                              <h5>plugins.js</h5>
                            </a>
                            <span>3kb</span>
                          </div>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i data-eva="more-vertical"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button type="button" className="dropdown-item">
                                Edit
                              </button>
                              <button type="button" className="dropdown-item">
                                Share
                              </button>
                              <button type="button" className="dropdown-item">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="compose"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="compose"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Compose</h5>
              <button
                type="button"
                className="btn round"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i data-eva="close"></i>
              </button>
            </div>
            <div className="modal-body">
              <ul className="nav" role="tablist">
                <li>
                  <a
                    href="#details"
                    className="active"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="details"
                    aria-selected="true"
                  >
                    Details
                  </a>
                </li>
                <li>
                  <a
                    href="#participants"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="participants"
                    aria-selected="false"
                  >
                    Participants
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="details tab-pane fade show active"
                  id="details"
                  role="tabpanel"
                >
                  <form>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="What's the topic?"
                      />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        className="form-control"
                        placeholder="Hmm, are you friendly?"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div
                  className="participants tab-pane fade"
                  id="participants"
                  role="tabpanel"
                >
                  <div className="search">
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
                  <h4>Users</h4>
                  <hr />
                  <ul className="users">
                    <li>
                      <div className="status online">
                        <img src={avatarMale1} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Ham Chuwon</h5>
                        <span>Florida, US</span>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="user1"
                        ></label>
                      </div>
                    </li>
                    <li>
                      <div className="status offline">
                        <img src={avatarMale2} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Quincy Hensen</h5>
                        <span>Shanghai, China</span>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user2"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="user2"
                        ></label>
                      </div>
                    </li>
                    <li>
                      <div className="status online">
                        <img src={avatarMale3} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Mark Hog</h5>
                        <span>Olso, Norway</span>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user3"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="user3"
                        ></label>
                      </div>
                    </li>
                    <li>
                      <div className="status offline">
                        <img src={avatarMale4} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Sanne Viscaal</h5>
                        <span>Helena, Montana</span>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user4"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="user4"
                        ></label>
                      </div>
                    </li>
                    <li>
                      <div className="status offline">
                        <img src={avatarMale5} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Alex Just</h5>
                        <span>London, UK</span>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user5"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="user5"
                        ></label>
                      </div>
                    </li>
                    <li>
                      <div className="status online">
                        <img src={avatarMale6} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Arturo Thomas</h5>
                        <span>Vienna, Austria</span>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user6"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="user6"
                        ></label>
                      </div>
                    </li>
                    <li>
                      <div className="status offline">
                        <img src={avatarFemale1} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Victoria Garner</h5>
                        <span>Chisinau, Moldova</span>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user7"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="user7"
                        ></label>
                      </div>
                    </li>
                    <li>
                      <div className="status offline">
                        <img src={avatarFemale2} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Maria Baron</h5>
                        <span>Indore, India</span>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user8"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="user8"
                        ></label>
                      </div>
                    </li>
                    <li>
                      <div className="status online">
                        <img src={avatarFemale3} alt="avatar" />
                        <i data-eva="radio-button-on"></i>
                      </div>
                      <div className="content">
                        <h5>Sara Koch</h5>
                        <span>Sofia, BG</span>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user9"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="user9"
                        ></label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn primary">
                Compose
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
