import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { Box, CircularProgress } from "@mui/material";


export const QuoteGeneratorCon = styled.div`
    min-height: 350px;
    min-width: 350px;
    height: 70vh;
    width: 70vw;
    border: 2px solid #ffffff22;
    border-radius: 15px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    z-index: 2;

    background: rgba( 0, 0, 70, 0.3 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 20px );
    -webkit-backdrop-filter: blur( 20px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
`;
