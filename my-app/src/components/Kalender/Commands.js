import React from "react";
import PropTypes from "prop-types";
import { CommandBar } from "@fluentui/react/lib/CommandBar";

function Commands(props) {
  const { onCommandClick } = props;

  const getItems = () => {
    return [
      {
        key: "AddAvailability",
        name: "Add",
        type: "Add",
        iconProps: {
          iconName: "Add"
        },
        onClick: (ev) => onCommandClick("Add", ev)
      }
    ];
  };

  const getOverflowItems = () => {
    return [];
  };

  const getFarItems = () => {
    return [
      {
        key: "calendar",
        text: "Calendar",
        ariaLabel: "Calendar view",
        iconOnly: true,
        iconProps: { iconName: "Calendar" },
        onClick: (ev) => onCommandClick("Calendar", ev)
      },
      {
        key: "list",
        text: "List View",
        ariaLabel: "List",
        iconOnly: true,
        iconProps: { iconName: "List" },
        onClick: (ev) => onCommandClick("List", ev)
      },
      {
        key: "info",
        text: "Info",
        ariaLabel: "Info",
        iconOnly: true,
        iconProps: { iconName: "Info" },
        onClick: () => console.log("Info")
      }
    ];
  };

  const overflowProps = { ariaLabel: "More commands" };

  return (
    <CommandBar
      items={getItems}
      overflowItems={getOverflowItems}
      overflowButtonProps={overflowProps}
      farItems={getFarItems}
      ariaLabel="Inbox actions"
      primaryGroupAriaLabel="Email actions"
      farItemsGroupAriaLabel="More actions"
    />
  );
}

Commands.propTypes = {
  onCommandClick: PropTypes.func.isRequired
};

/*function onCommitChanges() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: "", password: "" })
  const theme = createTheme()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      console.log(values)
      axios
        .post("http://localhost:8080/Calendar/create_Event", {
          ...values
        })
        .then(res => {
          if (res.data.result === "success") {
            const token = res.data.token
            const calendar = res.data.calendar
            localStorage.setItem("token", token)
            localStorage.setItem("Calendar", calendar)
            swal(
              "Edukalt event lisatud",
              res.data.message,
              "success"
            ).then(value => {
              navigate("/home")
            })
          } else if (res.data.result === "error") {
            swal("Error!", res.data.message, "error")
          }
        })
    } catch (error) {
      console.log(error)
      swal("Error!", error, "error")
    }
  }
}
  */
export default Commands;
