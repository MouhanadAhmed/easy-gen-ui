"use client";
import React from "react";
import Image from "next/image";
import { Accordion, Container, Rating, Tabs } from "@mantine/core";
import { IconDoor, IconPhone, IconMail } from "@tabler/icons-react";
import { UserData } from "src/Data/userData";
import { IconWorldWww } from "@tabler/icons-react";
import { PropertiesData } from "src/Data/propertiesData";
import PropertyCard from "src/components/Cards/PropertyCard";
import Link from "next/link";
import { ConfigColors } from "src/constants/ConfigColors";
import { LoggedInUser } from "@/types/user";
// individual profile page of the user/agent/consultant
// [id] - mean the dynamic route pass the user's id or slug param with Next.js Link component
// route: /profile/123

const ProfileViewPage = () => {
  let loggedUserData: string | null = null;
  if (typeof window !== "undefined") {
    loggedUserData = localStorage.getItem("custom-auth-user");
  }
  let userName = "";
  let userEmail = "";
  const userData = loggedUserData
    ? (JSON.parse(loggedUserData) as LoggedInUser)
    : undefined;
  if (userData) {
    userName = userData?.name ?? "";
    userEmail = userData?.email ?? "";
  }

  return (
    <Container size="xl" className="mt-24">
      <div className="flex mobile:flex-col pc:flex-row pc:space-x-2 ">
        {/* left section */}
        <div className="basis-1/3 space-y-2">
          {/* Avatar */}
          <div className="hidden">
            <Image
              src={UserData?.avatar}
              width={500}
              height={500}
              className="rounded-default aspect-square object-cover"
              alt="avatar image"
            />
          </div>
          {/* Personal details */}
          <div className="bg-white p-2 dark:bg-slate-900 dark:text-white/90">
            {/* Name */}
            <div className="text-2xl font-bold">{userData?.name}</div>
            {/* Profession */}
            <div className="text-lg opacity-80">{userData?.role}</div>
            {/* About me */}
            <p className="text-sm opacity-80">{UserData.aboutme}</p>
            {/* Ratings */}
            <div className="flex space-x-2">
              <Rating
                defaultValue={UserData.ratings}
                readOnly
                color={ConfigColors.primary}
              />
            </div>
          </div>
          {/* about */}
          <div className="rounded-default flex flex-col bg-white p-2 dark:bg-slate-900 dark:text-white/90">
            <div className="font-bold tablet:text-2xl">About</div>
            {/* basic info */}
            <ul className="flex flex-col gap-y-2">
              {/* address */}
              {/* <li className="flex gap-x-2">
                <IconDoor color={ConfigColors.primary} />
                <span>{UserData.address}</span>
              </li> */}
              {/* phone */}
              <li className="flex gap-x-2">
                <IconPhone color={ConfigColors.primary} />
                <span>{UserData.phone}</span>
              </li>
              {/* email */}
              <li className="flex gap-x-2">
                <IconMail color={ConfigColors.primary} />
                <span>{userData?.email}</span>
              </li>
              {/* website */}
              {/* <li className="flex gap-x-2">
                <IconWorldWww color={ConfigColors.primary} />
                <span>{UserData.website}</span>
              </li> */}
            </ul>

            {/* social links */}
            <div className="mt-4 flex hidden justify-between space-x-2">
              {UserData.socialLinks.map((link, idx) => (
                <Link href={link.link} key={idx}>
                  {/* <SecondaryButton icon={link.icon} /> */}
                  <span
                    className="duration-300 hover:opacity-50"
                    style={{ color: ConfigColors.primary }}
                  >
                    {link.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="flex basis-full flex-col space-y-2 mobile:mt-2 pc:mt-0 ">
          {/* my bookmarks */}
          <div>
            <Accordion
              variant="default"
              defaultValue="mylistings"
              className="rounded-default bg-white "
              classNames={{
                root: "dark:bg-slate-900 dark:text-white/90 dark:hover:bg-none",
                control: "dark:hover:bg-slate-900 dark:text-white",
              }}
            >
              <Accordion.Item value="mylistings">
                {/* Title */}
                <Accordion.Control className="font-bold">
                  <span className="font-bold">My Bookmarks</span>
                </Accordion.Control>
                <Accordion.Panel>
                  <div className="grid gap-2 mobile:grid-cols-1 pc:grid-cols-3">
                    {/* single property card */}
                    {PropertiesData.slice(0, 4).map((property, index) => (
                      <div key={index}>
                        <PropertyCard
                          id={property.id}
                          title={property.title}
                          features={{
                            bathrooms: property.bathrooms,
                            bedrooms: property.bedrooms,
                          }}
                          images={property.images}
                          link={"/property/" + property.id}
                          price={property.price}
                          propertyLocation={property.location}
                          propertyType={property.type}
                          tags={property.tags}
                        />
                      </div>
                    ))}
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
          {/* my listings */}
          <div>
            <Accordion
              variant="default"
              defaultValue="mylistings"
              className="rounded-default bg-white "
              classNames={{
                root: "dark:bg-slate-900 dark:text-white/90 dark:hover:bg-none",
                control: "dark:hover:bg-slate-900 dark:text-white",
              }}
            >
              <Accordion.Item value="mylistings">
                {/* Title */}
                <Accordion.Control className="font-bold">
                  <span className="font-bold">My listings</span>
                </Accordion.Control>
                <Accordion.Panel>
                  <Tabs variant="outline" defaultValue="Houses">
                    {/* Tabs */}
                    <Tabs.List>
                      <Tabs.Tab value="Houses">Houses</Tabs.Tab>
                      <Tabs.Tab value="Apartments">Apartments</Tabs.Tab>
                      <Tabs.Tab value="Cottages">Cottages</Tabs.Tab>
                    </Tabs.List>

                    {/* Tab content */}
                    {/* Houses */}
                    <Tabs.Panel value="Houses" pt="xs">
                      <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 pc:grid-cols-3">
                        {PropertiesData.slice(0, 3).map((property, index) => (
                          <div key={index}>
                            <PropertyCard
                              id={property.id}
                              title={property.title}
                              features={{
                                bathrooms: property.bathrooms,
                                bedrooms: property.bedrooms,
                              }}
                              images={property.images}
                              link={"/property/" + property.id}
                              price={property.price}
                              propertyLocation={property.location}
                              propertyType={property.type}
                              tags={property.tags}
                            />
                          </div>
                        ))}
                      </div>
                    </Tabs.Panel>
                    {/* Apartments */}
                    <Tabs.Panel value="Apartments" pt="xs">
                      <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 pc:grid-cols-3">
                        {PropertiesData.slice(0, 1).map((property, index) => (
                          <div key={index}>
                            <PropertyCard
                              id={property.id}
                              title={property.title}
                              features={{
                                bathrooms: property.bathrooms,
                                bedrooms: property.bedrooms,
                              }}
                              images={property.images}
                              link={"/property/" + property.id}
                              price={property.price}
                              propertyLocation={property.location}
                              propertyType={property.type}
                              tags={property.tags}
                            />
                          </div>
                        ))}
                      </div>
                    </Tabs.Panel>

                    {/* Cottages */}
                    <Tabs.Panel value="Cottages" pt="xs">
                      <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 pc:grid-cols-3">
                        {PropertiesData.slice(0, 4).map((property, index) => (
                          <div key={index}>
                            <PropertyCard
                              id={property.id}
                              title={property.title}
                              features={{
                                bathrooms: property.bathrooms,
                                bedrooms: property.bedrooms,
                              }}
                              images={property.images}
                              link={"/property/" + property.id}
                              price={property.price}
                              propertyLocation={property.location}
                              propertyType={property.type}
                              tags={property.tags}
                            />
                          </div>
                        ))}
                      </div>
                    </Tabs.Panel>
                  </Tabs>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileViewPage;
