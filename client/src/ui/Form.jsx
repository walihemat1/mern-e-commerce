import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function Form({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  disabled = false,
}) {
  function renderInputComponentByType(formControlItem) {
    let element = null;
    const value = formData[formControlItem.name] || "";

    switch (formControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={formControlItem.name}
            placeholder={formControlItem.placeholder}
            id={formControlItem.name}
            type={formControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [formControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            name={formControlItem.name}
            placeholder={formControlItem.placeholder}
            id={formControlItem.name}
            type={formControlItem.type}
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [formControlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {formControlItem.options && formControlItem.options.length > 0
                ? formControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={formControlItem.name}
            placeholder={formControlItem.placeholder}
            id={formControlItem.name}
            type={formControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [formControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={formControlItem.name}
            placeholder={formControlItem.placeholder}
            id={formControlItem.name}
            type={formControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [formControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputComponentByType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4 w-full" disabled={disabled}>
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default Form;
