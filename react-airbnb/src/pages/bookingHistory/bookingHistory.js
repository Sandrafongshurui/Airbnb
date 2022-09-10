import SiteHeader from "../../components/partials/siteHeaders/SiteHeaders";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function HostingHistory() {
  return (
    <div className={'container-fluid p-0'}>
      <SiteHeader />
      <div className={'container mt-4'}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No↑</TableCell>
                <TableCell>Booked By</TableCell>
                <TableCell>Date Period</TableCell>
                <TableCell>Guests</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Peter Chen</TableCell>
                <TableCell>20/03/2020-24/03-2020</TableCell>
                <TableCell>1 guest</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
export default HostingHistory;