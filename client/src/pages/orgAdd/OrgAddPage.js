import React, { useState } from 'react';
import { org_add, anydesk_add, rdp_add } from '../../http/clientsAPI';
import { routes } from '../../consts';
import { Navigate, useNavigate, NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import backBtnImg from '../../img/previous.png'