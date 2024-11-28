"use client";
import { useState, useEffect } from "react";
import { revalidatePath } from "next/cache";
import { CreateServiceDetailPopup } from "@/components/popup/CreateServiceDetailPopup";
import { CreateServiceTypePopup } from "@/components/popup/CreateServiceTypePopup";
import { CreateLeaveRequestPopup } from "@/components/popup/CreateLeaveRequestPopup";

interface Service {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  isActive: boolean;
}

const TestPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/service-categories");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/service-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create service");
      }

      const newService = await response.json();
      setServices((prev) => [...prev, newService]);

      // Reset form
      setFormData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <h1 className="text-6xl p-8">All Services</h1>

      <ul className="mb-8 w-full max-w-md">
        {services.map((service) => (
          <li
            key={service.id}
            className="flex flex-col mb-4 p-4 border rounded-lg"
          >
            <p className="text-2xl font-semibold">{service.name}</p>
            <p className="text-gray-600">{service.description}</p>
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border rounded-lg shadow-sm"
      >
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Service name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Service description"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        >
          Add Service
        </button>
      </form>

      <CreateServiceDetailPopup></CreateServiceDetailPopup>
      <CreateServiceTypePopup></CreateServiceTypePopup>
      <CreateLeaveRequestPopup></CreateLeaveRequestPopup>
    </div>
  );
};

export default TestPage;
