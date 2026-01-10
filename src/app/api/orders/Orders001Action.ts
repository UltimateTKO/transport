"use server";

import { NextRequest } from "next/server";
import { OffcanvasTitle } from "react-bootstrap";
import { prisma } from "@/libs/prisma";

/**
 * 都道府県一覧を取得
 * @returns 都道府県一覧
 */
export async function fetchPrefectures() {
	// const apiKey = process.env.NEXT_PUBLIC_MLIT_API_KEY ?? "";
	const response = await fetch("https://geoapi.heartrails.com/api/json?method=getPrefectures", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			// apikey: apiKey, // ←自分のAPIキーを入れる
		},
		// body: JSON.stringify({
		// 	query: `query { prefecture { code name } }`,
		// }),
	});

	if (!response.ok) {
		console.log("data");
	}

	// const data = await response.json();
	// console.log(data);
	// const list = data.response?.prefecture?.map((prefecture: string) => ({ value: prefecture })) ?? [];
	const listPromise = response
		.json()
		.then((data) => data.response?.prefecture ?? [])
		.then((prefecture: string[]) => prefecture.map((pref) => ({ value: pref })));
	return listPromise;
}

/**
 * 市町村一覧を取得
 * @param prefecture 県名
 * @returns 市町村一覧
 */
export async function fetchCities(prefecture: string) {
	// const apiKey = process.env.NEXT_PUBLIC_MLIT_API_KEY ?? "";
	const uri = `https://geoapi.heartrails.com/api/json?method=getCities&prefecture=${encodeURIComponent(prefecture)}`;
	const response = await fetch(uri, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			//apikey: apiKey, // ←自分のAPIキーを入れる
		},
		// body: JSON.stringify({
		// 	query: `query { municipalities(prefCodes:["${prefCodes}"]) { code name } }`,
		// }),
	});

	if (!response.ok) {
		console.log("data");
	}

	const listPromise = response
		.json()
		.then((data) => data.response?.location ?? [])
		.then((location: string[]) => Array.from(new Set(location.map((cityMap: any) => cityMap.city))))
		.then((cityDistinct) => cityDistinct.map((city) => ({ value: city }))); // 市町村名の重複排除;
	return listPromise;
}

/**
 * 町域一覧を取得
 * @param prefecture 県名
 * @param city 市町村名
 * @returns 町域一覧
 */
export async function fetchTowns(prefecture: string, city: string) {
	// const apiKey = process.env.NEXT_PUBLIC_MLIT_API_KEY ?? "";
	const uri = `https://geoapi.heartrails.com/api/json?method=getTowns&prefecture=${encodeURIComponent(prefecture)}&city=${encodeURIComponent(
		city
	)}`;
	const response = await fetch(uri, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			// apikey: apiKey, // ←自分のAPIキーを入れる
		},
		// body: JSON.stringify({
		// 	query: `query { municipalities(prefCodes:["${prefCodes}"]) { code name } }`,
		// }),
	});

	if (!response.ok) {
		console.log("data");
	}

	const listPromise = response
		.json()
		.then((data) => data.response?.location ?? [])
		.then((location: string[]) => Array.from(new Set(location.map((townmap: any) => townmap.town))))
		.then((townDistinct) => townDistinct.map((town) => ({ value: town }))); // 町域名の重複排除;
	return listPromise;
}

/**
 * 郵便番号から住所を取得
 * @param postalCode 郵便番号
 * @returns prefecturee, city, town
 */
export async function fetchAddressByPostalCode(postalCode: string) {
	// const apiKey = process.env.NEXT_PUBLIC_MLIT_API_KEY ?? "";
	const uri = `https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${encodeURIComponent(postalCode)}`;
	const response = await fetch(uri, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			// apikey: apiKey, // ←自分のAPIキーを入れる
		},
		// body: JSON.stringify({
		// 	query: `query { municipalities(prefCodes:["${prefCodes}"]) { code name } }`,
		// }),
	});

	if (!response.ok) {
		console.log("data");
	}

	const listPromise = response
		.json()
		.then((data) => data.response?.location ?? [])
		.then((location: any[]) => location.find((addrMap: any) => addrMap.postal === postalCode))
		.then((addrMap) => {
			return {
				prefecture: addrMap?.prefecture ?? "",
				city: addrMap?.city ?? "",
				town: addrMap?.town ?? "",
			};
		});
	return listPromise;
}

/**
 * M040_StartEndを引数のコードで絞込し、M040_StartEndに紐づくデータの県市町村町域を取得する
 * @param refernceCompanyCode 参照会社コード
 * @param startEndCode 積地・着地コード
 * @returns 県市町村町域情報
 */
export async function getStartEndAddress(refernceCompanyCode: string, startEndCode: string) {
	const record = await prisma.m040_StartEnd.findUnique({
		where: {
			RefernceCompanyCode_StartEndCode: {
				RefernceCompanyCode: refernceCompanyCode,
				StartEndCode: startEndCode,
			},
		},
		include: { Office: true },
	});

	const postalCode = record?.Office?.PostalCode ?? "";
	const prefecture = record?.Office?.Prefecture ?? "";
	const city = record?.Office?.City ?? "";
	const town = record?.Office?.Town ?? "";

	return { prefecture, city, town, postalCode };
}
