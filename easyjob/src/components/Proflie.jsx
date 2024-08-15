import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

export function Profile() {
  const { user, loading } = useAuth();
  const [userfirebase, setUserfirebase] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${user.uid}`
        );
        setUserfirebase(response.data.user[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      loadUser();
    }
  }, [user]);
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div class="bg-white overflow-hidden shadow rounded-lg border ">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Full name</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userfirebase.name} {userfirebase.lastname}
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userfirebase.email}
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Phone number</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userfirebase.phone}
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Country</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userfirebase.countryName}
              </dd>
              <dt class="text-sm font-medium text-gray-500">Province</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userfirebase.provinceName}
              </dd>
              <dt class="text-sm font-medium text-gray-500">City</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userfirebase.cityName}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
