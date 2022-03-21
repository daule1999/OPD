import { Box, Typography, Table, TableBody, TableCell, TableRow } from "@material-ui/core";

import "./example.css"

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from "../Loading";

export class CompToPrint extends Component {

  canvasEl;

  // componentDidMount() {
  //   const ctx = this.canvasEl.getContext("2d");
  //   if (ctx) {
  //     ctx.beginPath();
  //     ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  //     ctx.stroke();
  //     ctx.fillStyle = "rgb(200, 0, 0)";
  //     ctx.fillRect(85, 40, 20, 20);
  //     ctx.save();
  //   }
  // }

  handleCheckboxOnChange = () =>
    this.setState({ checked: !this.state.checked });

  setRef = (ref) => (this.canvasEl = ref);

  render() {
    const { finalDatas, loading } = this.props;
    console.log(finalDatas, "in reactTo print ")
    console.log(`obj.type.tableBody`, finalDatas[5].tableBody)
    if (loading) {
      return <div><Loading /></div>
    }
    return (
      <div>
        <Box mt={2} mb={6}>
          {finalDatas && finalDatas.map((obj) => {
            return <div key={obj.value} >
              {
                obj.type === 'text' && <Box key={obj.value}>
                  <Typography style={{ textAlign: 'center', fontWeight: `${obj.css["font-weight"]}`, fontSize: `${obj.css["font-size"]}` }} >
                    {obj.value}
                  </Typography>
                </Box>
              }
              {
                obj.type === 'table' && <div key={obj.value}>
                  <Table>
                    <TableBody>
                      {obj.tableBody && obj.tableBody.map((row, inx) => {
                        console.log("rowVal ", row)
                        return <>{
                          row[1].value && <TableRow key={inx}>
                            <TableCell>{row[0].value}</TableCell>
                            <TableCell>{row[1].value}</TableCell>
                          </TableRow>
                        }</>
                      })}
                      <TableRow>
                        <TableCell>Staff Sign</TableCell>
                        <TableCell>...............................................</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              }

            </div>
          })
          }
        </Box>
      </div >
    );
  }
}



const mapStateToProps = (state) => ({
  loading: state.reducers.loading
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CompToPrint)


export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  return <CompToPrint ref={ref} text={props.text} finalDatas={props.finalDatas} />;
});
