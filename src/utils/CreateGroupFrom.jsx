import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const CreateGroupForm = () => {
  const { register, handleSubmit, watch, control, } = useForm({
    defaultValues: {
      groupName: "",
      membersCount: "",
      members: [],
    },
  });

  const membersCount = watch("membersCount");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  // Update members array when membersCount changes
  React.useEffect(() => {
    const count = parseInt(membersCount) || 0;

    if (count > fields.length) {
      for (let i = fields.length; i < count; i++) {
        append({ name: "", amount: "" });
      }
    } else if (count < fields.length) {
      for (let i = fields.length; i > count; i--) {
        remove(i - 1);
      }
    }
  }, [membersCount, append, remove, fields.length]);



  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Enter group name"
          {...register("groupName", { required: true })}
          className="w-full border-2 p-2 rounded-lg"
        />
        {/* <input
          type="number"
          placeholder="Total amount"
          {...register("totalAmount", { required: true, min: 1 })}
          className="w-full border-2 p-2 rounded-lg"
        /> */}
        <input
          type="number"
          placeholder="Members in group"
          {...register("membersCount", { required: true, min: 1 })}
          className="w-full border-2 p-2 rounded-lg"
        />

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2 border-t pt-4">
            <h4 className="font-semibold">Member {index + 1}</h4>
            <input
              type="text"
              placeholder="Member name"
              {...register(`members.${index}.name`, { required: true })}
              className="w-full border-2 p-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="Member amount"
              {...register(`members.${index}.amount`, { required: true })}
              className="w-full border-2 p-2 rounded-lg"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateGroupForm;
