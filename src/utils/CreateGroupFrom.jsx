import React, { useContext, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs
import { AuthContext } from "../context/AuthProvider";

const CreateGroupForm = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      groupName: "",
      membersCount: "",
      members: [],
    },
  });

  const membersCount = watch("membersCount");
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "members",
  });

  // Update members array when membersCount changes
  React.useEffect(() => {
    const count = parseInt(membersCount) || 0;

    if (count > fields.length) {
      for (let i = fields.length; i < count; i++) {
        append({ id: uuidv4(), name: "", amount: 0 });
      }
    } else if (count < fields.length) {
      for (let i = fields.length; i > count; i--) {
        remove(i - 1);
      }
    }
  }, [membersCount, append, remove, fields.length]);

  const onSubmit = async (data) => {
    const groupInfo = {
      groupName: data.groupName,
      groupAdmin: user?.email,
      membersCount: parseInt(data.membersCount),
      members: data.members.map((member) => ({
        id: member.id,
        name: member.name,
        amount: parseFloat(member.amount), // Ensure amount is a number
      })),
    };

    try {
      const res = await axios.post(`http://localhost:5000/group`, groupInfo);
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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

        <input
          type="number"
          placeholder="Members in group"
          min={0}
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
              {...register(`members.${index}.amount`, {
                required: true,
                valueAsNumber: true,
              })}
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
