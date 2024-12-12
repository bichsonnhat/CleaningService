//Use multipart form data to upload an image to Cloudinary

import { NextResponse } from "next/server";
import { cloudinary } from "../../(lib)/cloudinary-service";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { status: "error", error: "No file uploaded" },
        { status: 400 }
      );
    }

    const fileBuffer = await file.arrayBuffer();
    const fileBase64 = Buffer.from(fileBuffer).toString("base64");
    const dataUri = `data:${file.type};base64,${fileBase64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "image-upload",
    });

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Error creating service detail:", error);
    return NextResponse.json(
      { status: "error", error: "Failed to create service detail" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const formData = await request.formData();
    const imageUrl = formData.get("url") as string;

    if (!imageUrl) {
      return NextResponse.json(
        { status: "error", error: "No URL provided" },
        { status: 400 }
      );
    }

    const publicId = "image-upload/" + extractPublicId(imageUrl);

    if (!publicId) {
      return NextResponse.json(
        {
          status: "error",
          error: "Invalid URL or public ID could not be extracted",
        },
        { status: 400 }
      );
    }

    console.log("publicId", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return NextResponse.json(
        { status: "error", error: "Failed to delete the image" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { status: "error", error: "Failed to delete image" },
      { status: 500 }
    );
  }
}

function extractPublicId(url: string): string | null {
  try {
    const parts = url.split("/");
    const filenameWithExtension = parts[parts.length - 1];
    const publicId = filenameWithExtension.split(".")[0];
    return publicId;
  } catch {
    return null;
  }
}
