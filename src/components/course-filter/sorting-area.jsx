import Link from "next/link";
import React from "react";
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
import {
  COURSE_DEGREE_ID,
  COURSE_FACULTY_ID,
  COURSE_INSTITUTION_ID,
  getCookieAsync,
} from "../../utils/global";
const SortingArea = ({
  handleChange,
  institutions,
  faculties,
  degreeTypes,
  handleOptionChange,
  hasLoadedInstitution,
  hasLoadedFaculty,
  hasLoadedDegreeType,
  degreeTypeId,
  institutionId,
  facultyId,
  handleReset,
  search,
  hasLoaded,
}) => {
  return (
    <div class="shadow-none p-3 mb-5 bg-body-tertiary rounded">
      <Form>
        <Segment>
          <Form.Group>
            <Form.Field width={4}>
              <label>Search course</label>
              <input
                style={{ height: 40 }}
                value={search}
                type="text"
                onChange={handleChange}
                placeholder="Search by course"
              />
            </Form.Field>
            {hasLoaded && (
              <Form.Select
                defaultValue={institutionId}
                width={4}
                placeholder="Institution"
                fluid
                selection
                onChange={handleOptionChange}
                name="institution"
                label="Institution"
                options={institutions}
              />
            )}
            {hasLoaded && (
              <Form.Select
                defaultValue={facultyId}
                width={4}
                placeholder="Faculty"
                fluid
                selection
                onChange={handleOptionChange}
                name="faculty"
                label="Faculty"
                options={faculties}
              />
            )}
            {hasLoaded && (
              <Form.Select
                defaultValue={degreeTypeId}
                width={4}
                placeholder="Degree Type"
                fluid
                selection
                onChange={handleOptionChange}
                name="degreeType"
                label="Degree Type"
                options={degreeTypes}
              />
            )}
            <Form.Button
              onClick={handleReset}
              style={{ marginTop: 20 }}
              width={2}
              color="blue"
            >
              Reset
            </Form.Button>
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
    </div>
  );
};

export default SortingArea;
