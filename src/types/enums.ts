export enum Colors {
  BG_DARK = "#202124",
  COLOR_DARK = "#e8eaed",
  CHECKED_COLOR = "#99999b",
  BOX_SHADOW = "#00000059 0 5px 15px",
  BORDER = "1px solid rgba(255,255,255,.219)",
}

export const DarkTheme = {
  backgroundColor: Colors.BG_DARK,
  color: Colors.COLOR_DARK,
};

export const checkedStyle = {
  textDecoration: "line-through",
  color: Colors.CHECKED_COLOR,
};

export enum SortType {
  ACTIVE = "active",
  COMPLETED = "completed",
  ALL = "all",
}
