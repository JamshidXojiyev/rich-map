import React, { useEffect, useState } from "react";
import {
  H3,
  PageBtnStyled,
  TableBottom,
  TableBottomBtns,
  TableStyle,
  TdStyle,
  ThStyle,
  TotalUserStyle,
  TrStyle,
} from "./my-table.s";
import { ReactComponent as BottomIcon } from "../../assets/icons/bottom.svg";
import MySelect from "../my-select/my-select";

function MyTable(props) {
  const [pageLimit, setpageLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState();
  useEffect(() => {
    setPage(1);
    setPages(Math.ceil(props.total / pageLimit));
  }, [pageLimit, props.total]);
  useEffect(() => {
    if (!props.pageNone) {
      props.set_page(page);
      props.set_page_limit(pageLimit);
    }
  }, [pageLimit, page]);
  return !props.data?.body ? (
    "404"
  ) : (
    <div>
      <div
        style={{
          overflowX: "auto",
        }}
      >
        <TableStyle>
          <TrStyle>
            {props.data.header.map((item, index) => (
              <ThStyle key={index}>{item}</ThStyle>
            ))}
          </TrStyle>
          {props.data.body.map((item, index) => (
            <TrStyle key={index} onDoubleClick={() => props.itemValue(item)}>
              {props.data.order.map((subItem, subIndex) => (
                <TdStyle key={subIndex}>
                  {typeof subItem === "string" ? item[subItem] : item(subItem)}
                </TdStyle>
              ))}
            </TrStyle>
          ))}
        </TableStyle>
      </div>
      {props.pageNone ? (
        ""
      ) : (
        <TableBottom>
          <TotalUserStyle>Total items: {props.total}</TotalUserStyle>
          <TableBottomBtns line gap="12px" width="auto">
            <H3>Count items: </H3>
            <MySelect
              width="80px"
              table
              roundBorder
              value={pageLimit}
              options={["2", "5", "10", "20", "30", "50", "100"]}
              onChange={(e) => setpageLimit(e.target.value)}
            />
            <PageBtnStyled
              pagination
              left
              disabled={page == "1" ? true : false}
              onClick={() => page !== "1" && setPage(page - 1)}
            >
              <BottomIcon />
            </PageBtnStyled>
            <MySelect
              width="80px"
              table
              roundBorder
              value={page}
              options={Array.from(Array(pages).keys(), (x) => x + 1)}
              onChange={(e) => setPage(e.target.value)}
            />
            <PageBtnStyled
              pagination
              right
              disabled={page == pages ? true : false}
              onClick={() => page !== pages && setPage(parseInt(page) + 1)}
            >
              <BottomIcon />
            </PageBtnStyled>
          </TableBottomBtns>
        </TableBottom>
      )}
    </div>
  );
}

export default MyTable;
