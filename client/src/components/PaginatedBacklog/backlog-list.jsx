import { useEffect, useState } from "react";
import { fetchStudents } from "../../../data/fetchStudents";
import { StudentList } from "./student-list/student-list";
import { Pagination } from "./pagination/pagination";
import { PAGE_SIZE_OPTIONS } from "../../../constants/constants";
import { useQuery } from "@tanstack/react-query";
