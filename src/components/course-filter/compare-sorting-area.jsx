import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  add_force_page,
  add_item_offset,
} from "../../redux/features/filter-slice";
import {
  Segment,
  Header,
  Icon,
  Grid,
  Dropdown,
  Form,
  Button,
  Image,
} from "semantic-ui-react";
const SortingArea = ({
  handleChange,
  institutions,
  faculties,
  degreeTypes,
  handleOptionChange,
  defaultFaculty,
  handleSearchBtn,
  defaultInstitution,
  handleCompareChange,
}) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const compareOptions = [
    {
      key: "",
      text: "Compare",
      value: "",
    },
    {
      key: "Courses",
      text: "Courses",
      value: "Courses",
    },
    {
      key: "Tuition Fees",
      text: "Tuition Fees",
      value: "Tuition Fees",
    },
    {
      key: "Scholarship Amount",
      text: "Scholarship Amount",
      value: "Scholarship Amount",
    },
  ];

  return (
    <div class="shadow-none p-3 mb-5 bg-body-tertiary rounded">
      <Form>
        <Segment>
          <Grid style={{ paddingLeft: 10, marginBottom: 30 }} columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Dropdown
                  name="compareValue"
                  placeholder="Compare"
                  fluid
                  selection
                  options={compareOptions}
                  onChange={handleCompareChange}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Form.Group>
            <Form.Field width={4}>
              <label>Search course</label>
              <input
                style={{ height: 40 }}
                type="text"
                onChange={handleChange}
                placeholder="Search by course"
              />
            </Form.Field>
            <Form.Select
              width={3}
              placeholder="Institution One"
              fluid
              selection
              label="Institution One"
              name="institution1"
              onChange={handleOptionChange}
              options={institutions}
            />
            <Form.Select
              width={3}
              placeholder="Institution Two"
              fluid
              selection
              onChange={handleOptionChange}
              name="institution2"
              label="Institution Two"
              options={institutions}
            />
            <Form.Select
              width={3}
              placeholder="Faculty"
              fluid
              selection
              onChange={handleOptionChange}
              name="faculty"
              label="Faculty"
              options={faculties}
            />
            <Form.Select
              width={3}
              placeholder="Degree Type"
              fluid
              selection
              onChange={handleOptionChange}
              name="degreeType"
              label="Degree Type"
              options={degreeTypes}
            />
            <Form.Button
              onClick={handleSearchBtn}
              style={{ marginTop: 25 }}
              primary
              fluid
              content="Search"
            />
          </Form.Group>
          {/* <Button type="button">Search</Button> */}
          {/* <Grid style={{ paddingLeft: 10 }} columns={3}>
            <Grid.Row>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid.Row>
          </Grid> */}
        </Segment>
      </Form>

      {/* <div className="edu-sorting-area">
        <div className="edu-sorting">
          <select
            name="faculty"
            onChange={handleOptionChange}
            className="edu-select"
          >
            <option value="fee">{"Fee"}</option>
            <option value="scholarship">{"Scholarship"}</option>
            <option value="course">{"Course"}</option>;
          </select>
        </div>
        <div className="sorting-left">
          <div className="form-group">
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              placeholder="Search course by name"
            />
          </div>
        </div>
        <div className="sorting-right">
          
          <div style={{ marginRight: 10 }} className="edu-sorting">
            <select
              name="degree"
              style={{ width: 100 }}
              onChange={handleOptionChange}
              className="edu-select"
            >
              <option value="">{"All Degree types"}</option>
              {degreeTypes.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div style={{ marginRight: 10 }} className="edu-sorting">
            <select
              name="faculty"
              onChange={handleOptionChange}
              className="edu-select"
            >
              <option value="">{"All Faculties"}</option>;
              {faculties.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="edu-sorting">
            <select
              name="institution"
              onChange={handleOptionChange}
              value={defaultInstitution}
              className="edu-select"
            >
              <option value="">{"All Institutions"}</option>;
              {institutions.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </select>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SortingArea;
