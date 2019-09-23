import React from "react";

// Static assets
import avatarMale1 from "../../../static/img/avatars/avatar-male-1.jpg";

const Settings = ({ isActive }) => (
  <div
    className={`tab-pane fade${isActive ? " active show" : ""}`}
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
                    <input type="checkbox" onChange={() => {}} checked />
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
                    <input type="checkbox" onChange={() => {}} checked />
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
                    <input type="checkbox" onChange={() => {}} checked />
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
                    <input type="checkbox" onChange={() => {}} checked />
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
                      <input type="checkbox" onChange={() => {}} checked />
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
                      <input type="checkbox" onChange={() => {}} checked />
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
);

export default Settings;
