import { NextResponse } from "next/server";
import pool from "@/utils/databases/mysql/pool";

export async function useFetch() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from projects'
        const [rows] = await db.execute(query)
        db.release()

        return rows
    } catch (error) {
        return {
            error: error
        }
    }
}