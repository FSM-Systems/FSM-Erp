--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: equipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE equipment (
    eid integer NOT NULL,
    enumberplate character varying(7) NOT NULL,
    edescription character varying,
    eroadlicense date,
    einsurance date,
    etra date,
    epurchased date,
    e_user integer,
    eactive boolean DEFAULT true
);


ALTER TABLE equipment OWNER TO postgres;

--
-- Name: equipment_eid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE equipment_eid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE equipment_eid_seq OWNER TO postgres;

--
-- Name: equipment_eid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE equipment_eid_seq OWNED BY equipment.eid;


--
-- Name: equipment_models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE equipment_models (
    emid integer NOT NULL,
    emdescription character varying,
    em_user integer
);


ALTER TABLE equipment_models OWNER TO postgres;

--
-- Name: equipment_models_emid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE equipment_models_emid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE equipment_models_emid_seq OWNER TO postgres;

--
-- Name: equipment_models_emid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE equipment_models_emid_seq OWNED BY equipment_models.emid;


--
-- Name: goods_issue_notes_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE goods_issue_notes_details (
    gindid integer NOT NULL,
    gindsku integer,
    gindqty integer,
    gind_user integer,
    gind_ginid integer
);


ALTER TABLE goods_issue_notes_details OWNER TO postgres;

--
-- Name: good_issue_notes_details_gindid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE good_issue_notes_details_gindid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE good_issue_notes_details_gindid_seq OWNER TO postgres;

--
-- Name: good_issue_notes_details_gindid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE good_issue_notes_details_gindid_seq OWNED BY goods_issue_notes_details.gindid;


--
-- Name: goods_issue_notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE goods_issue_notes (
    ginid integer NOT NULL,
    ginissuedto integer NOT NULL,
    ginissuedby integer NOT NULL,
    gindate date DEFAULT now() NOT NULL,
    ginnotes text,
    gin_user integer NOT NULL
);


ALTER TABLE goods_issue_notes OWNER TO postgres;

--
-- Name: goods_issue_notes_ginid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE goods_issue_notes_ginid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE goods_issue_notes_ginid_seq OWNER TO postgres;

--
-- Name: goods_issue_notes_ginid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE goods_issue_notes_ginid_seq OWNED BY goods_issue_notes.ginid;


--
-- Name: login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE login (
    lid integer NOT NULL,
    lusername character varying,
    lpassword character varying,
    ldescription character varying,
    lactive boolean DEFAULT true,
    lpermissions character varying,
    lemail citext,
    l_user integer
);


ALTER TABLE login OWNER TO postgres;

--
-- Name: login_lid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE login_lid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE login_lid_seq OWNER TO postgres;

--
-- Name: login_lid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE login_lid_seq OWNED BY login.lid;


--
-- Name: maintenance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE maintenance (
    mnid integer NOT NULL,
    mnequipment integer,
    mnrequestdate date,
    mnacceptdate date,
    mnfinisheddate date,
    mnrequestedby integer,
    mnapprovedby integer,
    mnclosedby integer,
    mn_user integer
);


ALTER TABLE maintenance OWNER TO postgres;

--
-- Name: maintenance_mnid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE maintenance_mnid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maintenance_mnid_seq OWNER TO postgres;

--
-- Name: maintenance_mnid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE maintenance_mnid_seq OWNED BY maintenance.mnid;


--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu (
    mid integer NOT NULL,
    mdescription character varying,
    mactive boolean DEFAULT true,
    morder integer DEFAULT 10000,
    mlink character varying,
    mlongdescription text,
    mnewitemlink character varying,
    mgroup integer,
    m_user integer
);


ALTER TABLE menu OWNER TO postgres;

--
-- Name: menu_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu_groups (
    mgid integer NOT NULL,
    mgdescription character varying,
    mgactive boolean DEFAULT true,
    mgicon character varying,
    mgorder integer DEFAULT 1000,
    mgtype character varying,
    mg_user integer
);


ALTER TABLE menu_groups OWNER TO postgres;

--
-- Name: menu_groups_mgid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE menu_groups_mgid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE menu_groups_mgid_seq OWNER TO postgres;

--
-- Name: menu_groups_mgid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE menu_groups_mgid_seq OWNED BY menu_groups.mgid;


--
-- Name: menu_mid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE menu_mid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE menu_mid_seq OWNER TO postgres;

--
-- Name: menu_mid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE menu_mid_seq OWNED BY menu.mid;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE suppliers (
    sid integer NOT NULL,
    sname character varying,
    s_user integer
);


ALTER TABLE suppliers OWNER TO postgres;

--
-- Name: suppliers_sid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE suppliers_sid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE suppliers_sid_seq OWNER TO postgres;

--
-- Name: suppliers_sid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE suppliers_sid_seq OWNED BY suppliers.sid;


--
-- Name: vw_goods_issued_notes; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW vw_goods_issued_notes AS
 SELECT goods_issue_notes.ginid,
    u1.ldescription AS by,
    u2.ldescription AS "to",
    to_char((goods_issue_notes.gindate)::timestamp with time zone, 'dd/mm/yyyy'::text) AS date,
    goods_issue_notes.ginnotes AS notes
   FROM ((goods_issue_notes
     LEFT JOIN login u1 ON ((goods_issue_notes.ginissuedby = u1.lid)))
     LEFT JOIN login u2 ON ((goods_issue_notes.ginissuedto = u2.lid)))
  ORDER BY goods_issue_notes.ginid DESC;


ALTER TABLE vw_goods_issued_notes OWNER TO postgres;

--
-- Name: warehouse_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE warehouse_items (
    wiid integer NOT NULL,
    wisku character varying,
    widescription character varying,
    wiforequip integer,
    wi_unit integer,
    wi_unit_cost numeric(12,2),
    wi_unit_price numeric(12,2),
    wi_user integer
);


ALTER TABLE warehouse_items OWNER TO postgres;

--
-- Name: warehouse_units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE warehouse_units (
    wuid integer NOT NULL,
    wuunit character varying,
    wu_user integer
);


ALTER TABLE warehouse_units OWNER TO postgres;

--
-- Name: vw_goods_issued_notes_details; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW vw_goods_issued_notes_details AS
 SELECT goods_issue_notes_details.gindid,
    warehouse_items.wisku,
    warehouse_items.widescription,
    goods_issue_notes_details.gindqty,
    goods_issue_notes_details.gind_ginid,
    warehouse_units.wuunit
   FROM ((goods_issue_notes_details
     LEFT JOIN warehouse_items ON ((goods_issue_notes_details.gindsku = warehouse_items.wiid)))
     LEFT JOIN warehouse_units ON ((warehouse_items.wi_unit = warehouse_units.wuid)))
  ORDER BY goods_issue_notes_details.gindid DESC;


ALTER TABLE vw_goods_issued_notes_details OWNER TO postgres;

--
-- Name: warehouse_stock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE warehouse_stock (
    wsid integer NOT NULL,
    wsitem integer,
    wsqty integer DEFAULT 0,
    wswarehouse integer,
    ws_user integer
);


ALTER TABLE warehouse_stock OWNER TO postgres;

--
-- Name: warehouses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE warehouses (
    wid integer NOT NULL,
    wdescription character varying,
    wactive boolean DEFAULT true,
    w_user integer
);


ALTER TABLE warehouses OWNER TO postgres;

--
-- Name: vw_warehouse_stock; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW vw_warehouse_stock AS
 SELECT warehouse_items.wisku,
    warehouse_items.widescription,
    sum(warehouse_stock.wsqty) AS wsqty,
    warehouse_units.wuunit,
    warehouses.wdescription,
    equipment_models.emdescription
   FROM ((((warehouse_stock
     LEFT JOIN warehouse_items ON ((warehouse_stock.wsitem = warehouse_items.wiid)))
     LEFT JOIN warehouse_units ON ((warehouse_items.wi_unit = warehouse_units.wuid)))
     LEFT JOIN warehouses ON ((warehouse_stock.wswarehouse = warehouses.wid)))
     LEFT JOIN equipment_models ON ((warehouse_items.wiforequip = equipment_models.emid)))
  GROUP BY warehouse_items.wisku, warehouse_items.widescription, warehouse_units.wuunit, warehouses.wdescription, equipment_models.emdescription
  ORDER BY warehouse_items.widescription;


ALTER TABLE vw_warehouse_stock OWNER TO postgres;

--
-- Name: warehouse_items_wiid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE warehouse_items_wiid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE warehouse_items_wiid_seq OWNER TO postgres;

--
-- Name: warehouse_items_wiid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE warehouse_items_wiid_seq OWNED BY warehouse_items.wiid;


--
-- Name: warehouse_stock_wsid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE warehouse_stock_wsid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE warehouse_stock_wsid_seq OWNER TO postgres;

--
-- Name: warehouse_stock_wsid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE warehouse_stock_wsid_seq OWNED BY warehouse_stock.wsid;


--
-- Name: warehouse_units_wuid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE warehouse_units_wuid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE warehouse_units_wuid_seq OWNER TO postgres;

--
-- Name: warehouse_units_wuid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE warehouse_units_wuid_seq OWNED BY warehouse_units.wuid;


--
-- Name: warehouses_wid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE warehouses_wid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE warehouses_wid_seq OWNER TO postgres;

--
-- Name: warehouses_wid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE warehouses_wid_seq OWNED BY warehouses.wid;


--
-- Name: equipment eid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipment ALTER COLUMN eid SET DEFAULT nextval('equipment_eid_seq'::regclass);


--
-- Name: equipment_models emid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipment_models ALTER COLUMN emid SET DEFAULT nextval('equipment_models_emid_seq'::regclass);


--
-- Name: goods_issue_notes ginid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes ALTER COLUMN ginid SET DEFAULT nextval('goods_issue_notes_ginid_seq'::regclass);


--
-- Name: goods_issue_notes_details gindid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes_details ALTER COLUMN gindid SET DEFAULT nextval('good_issue_notes_details_gindid_seq'::regclass);


--
-- Name: login lid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY login ALTER COLUMN lid SET DEFAULT nextval('login_lid_seq'::regclass);


--
-- Name: maintenance mnid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY maintenance ALTER COLUMN mnid SET DEFAULT nextval('maintenance_mnid_seq'::regclass);


--
-- Name: menu mid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu ALTER COLUMN mid SET DEFAULT nextval('menu_mid_seq'::regclass);


--
-- Name: menu_groups mgid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_groups ALTER COLUMN mgid SET DEFAULT nextval('menu_groups_mgid_seq'::regclass);


--
-- Name: suppliers sid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY suppliers ALTER COLUMN sid SET DEFAULT nextval('suppliers_sid_seq'::regclass);


--
-- Name: warehouse_items wiid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_items ALTER COLUMN wiid SET DEFAULT nextval('warehouse_items_wiid_seq'::regclass);


--
-- Name: warehouse_stock wsid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_stock ALTER COLUMN wsid SET DEFAULT nextval('warehouse_stock_wsid_seq'::regclass);


--
-- Name: warehouse_units wuid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_units ALTER COLUMN wuid SET DEFAULT nextval('warehouse_units_wuid_seq'::regclass);


--
-- Name: warehouses wid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouses ALTER COLUMN wid SET DEFAULT nextval('warehouses_wid_seq'::regclass);


--
-- Name: equipment_models equipment_models_emdescription_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipment_models
    ADD CONSTRAINT equipment_models_emdescription_unique UNIQUE (emdescription);


--
-- Name: equipment_models equipment_models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipment_models
    ADD CONSTRAINT equipment_models_pkey PRIMARY KEY (emid);


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (eid);


--
-- Name: goods_issue_notes_details good_issue_notes_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes_details
    ADD CONSTRAINT good_issue_notes_details_pkey PRIMARY KEY (gindid);


--
-- Name: goods_issue_notes goods_issue_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes
    ADD CONSTRAINT goods_issue_notes_pkey PRIMARY KEY (ginid);


--
-- Name: login login_credentials_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY login
    ADD CONSTRAINT login_credentials_unique UNIQUE (lusername, lpassword, ldescription);


--
-- Name: login login_lemail_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY login
    ADD CONSTRAINT login_lemail_key UNIQUE (lemail);


--
-- Name: login login_lusername_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY login
    ADD CONSTRAINT login_lusername_unique UNIQUE (lusername);


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY login
    ADD CONSTRAINT login_pkey PRIMARY KEY (lid);


--
-- Name: maintenance maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY maintenance
    ADD CONSTRAINT maintenance_pkey PRIMARY KEY (mnid);


--
-- Name: menu_groups menu_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_groups
    ADD CONSTRAINT menu_groups_pkey PRIMARY KEY (mgid);


--
-- Name: menu menu_mlink_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu
    ADD CONSTRAINT menu_mlink_unique UNIQUE (mlink);


--
-- Name: menu menu_mnewitemlink_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu
    ADD CONSTRAINT menu_mnewitemlink_unique UNIQUE (mnewitemlink);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (mid);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (sid);


--
-- Name: warehouse_items warehouse_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_items
    ADD CONSTRAINT warehouse_items_pkey PRIMARY KEY (wiid);


--
-- Name: warehouse_items warehouse_items_widescription_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_items
    ADD CONSTRAINT warehouse_items_widescription_unique UNIQUE (widescription);


--
-- Name: warehouse_items warehouse_items_wisku_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_items
    ADD CONSTRAINT warehouse_items_wisku_unique UNIQUE (wisku);


--
-- Name: warehouse_stock warehouse_stock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_stock
    ADD CONSTRAINT warehouse_stock_pkey PRIMARY KEY (wsid);


--
-- Name: warehouse_units warehouse_units_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_units
    ADD CONSTRAINT warehouse_units_pkey PRIMARY KEY (wuid);


--
-- Name: warehouse_units warehouse_units_wuunit_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_units
    ADD CONSTRAINT warehouse_units_wuunit_unique UNIQUE (wuunit);


--
-- Name: warehouses warehouses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (wid);


--
-- Name: fki_maintenance_mnrequestedby_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_maintenance_mnrequestedby_fkey ON maintenance USING btree (mnrequestedby);


--
-- Name: fki_menu_mgroup_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_menu_mgroup_fkey ON menu USING btree (mgroup);


--
-- Name: fki_warehouse_items_wiforequip_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_warehouse_items_wiforequip_fkey ON warehouse_items USING btree (wiforequip);


--
-- Name: equipment equipment_e_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipment
    ADD CONSTRAINT equipment_e_user_fkey FOREIGN KEY (e_user) REFERENCES login(lid);


--
-- Name: equipment_models equipment_models_em_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipment_models
    ADD CONSTRAINT equipment_models_em_user_fkey FOREIGN KEY (em_user) REFERENCES login(lid);


--
-- Name: goods_issue_notes_details good_issue_notes_details_gind_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes_details
    ADD CONSTRAINT good_issue_notes_details_gind_user_fkey FOREIGN KEY (gind_user) REFERENCES login(lid);


--
-- Name: goods_issue_notes_details good_issue_notes_details_gindsku_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes_details
    ADD CONSTRAINT good_issue_notes_details_gindsku_fkey FOREIGN KEY (gindsku) REFERENCES warehouse_items(wiid);


--
-- Name: goods_issue_notes_details goods_issue_notes_details_gind_ginid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes_details
    ADD CONSTRAINT goods_issue_notes_details_gind_ginid_fkey FOREIGN KEY (gind_ginid) REFERENCES goods_issue_notes(ginid);


--
-- Name: goods_issue_notes goods_issue_notes_gin_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes
    ADD CONSTRAINT goods_issue_notes_gin_user_fkey FOREIGN KEY (gin_user) REFERENCES login(lid);


--
-- Name: goods_issue_notes goods_issue_notes_ginissuedby_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes
    ADD CONSTRAINT goods_issue_notes_ginissuedby_fkey FOREIGN KEY (ginissuedby) REFERENCES login(lid);


--
-- Name: goods_issue_notes goods_issue_notes_ginissuedto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goods_issue_notes
    ADD CONSTRAINT goods_issue_notes_ginissuedto_fkey FOREIGN KEY (ginissuedto) REFERENCES login(lid);


--
-- Name: login login_l_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY login
    ADD CONSTRAINT login_l_user_fkey FOREIGN KEY (l_user) REFERENCES login(lid);


--
-- Name: maintenance maintenance_mn_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY maintenance
    ADD CONSTRAINT maintenance_mn_user_fkey FOREIGN KEY (mn_user) REFERENCES login(lid);


--
-- Name: maintenance maintenance_mnapprovedby_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY maintenance
    ADD CONSTRAINT maintenance_mnapprovedby_fkey FOREIGN KEY (mnapprovedby) REFERENCES login(lid);


--
-- Name: maintenance maintenance_mnclosedby_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY maintenance
    ADD CONSTRAINT maintenance_mnclosedby_fkey FOREIGN KEY (mnclosedby) REFERENCES login(lid);


--
-- Name: maintenance maintenance_mnequipment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY maintenance
    ADD CONSTRAINT maintenance_mnequipment_fkey FOREIGN KEY (mnequipment) REFERENCES equipment(eid);


--
-- Name: maintenance maintenance_mnrequestedby_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY maintenance
    ADD CONSTRAINT maintenance_mnrequestedby_fkey FOREIGN KEY (mnrequestedby) REFERENCES login(lid);


--
-- Name: menu_groups menu_groups_mg_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_groups
    ADD CONSTRAINT menu_groups_mg_user_fkey FOREIGN KEY (mg_user) REFERENCES login(lid);


--
-- Name: menu menu_m_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu
    ADD CONSTRAINT menu_m_user_fkey FOREIGN KEY (m_user) REFERENCES login(lid);


--
-- Name: menu menu_mgroup_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu
    ADD CONSTRAINT menu_mgroup_fkey FOREIGN KEY (mgroup) REFERENCES menu_groups(mgid);


--
-- Name: suppliers suppliers_s_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY suppliers
    ADD CONSTRAINT suppliers_s_user_fkey FOREIGN KEY (s_user) REFERENCES login(lid);


--
-- Name: warehouse_items warehouse_items_wi_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_items
    ADD CONSTRAINT warehouse_items_wi_unit_fkey FOREIGN KEY (wi_unit) REFERENCES warehouse_units(wuid);


--
-- Name: warehouse_items warehouse_items_wi_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_items
    ADD CONSTRAINT warehouse_items_wi_user_fkey FOREIGN KEY (wi_user) REFERENCES login(lid);


--
-- Name: warehouse_items warehouse_items_wiforequip_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_items
    ADD CONSTRAINT warehouse_items_wiforequip_fkey FOREIGN KEY (wiforequip) REFERENCES equipment_models(emid);


--
-- Name: warehouse_stock warehouse_stock_ws_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_stock
    ADD CONSTRAINT warehouse_stock_ws_user_fkey FOREIGN KEY (ws_user) REFERENCES login(lid);


--
-- Name: warehouse_stock warehouse_stock_wsitem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_stock
    ADD CONSTRAINT warehouse_stock_wsitem_fkey FOREIGN KEY (wsitem) REFERENCES warehouse_items(wiid);


--
-- Name: warehouse_stock warehouse_stock_wswarehouse_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_stock
    ADD CONSTRAINT warehouse_stock_wswarehouse_fkey FOREIGN KEY (wswarehouse) REFERENCES warehouses(wid);


--
-- Name: warehouse_units warehouse_units_wu_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse_units
    ADD CONSTRAINT warehouse_units_wu_user_fkey FOREIGN KEY (wu_user) REFERENCES login(lid);


--
-- Name: warehouses warehouses_w_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouses
    ADD CONSTRAINT warehouses_w_user_fkey FOREIGN KEY (w_user) REFERENCES login(lid);


--
-- PostgreSQL database dump complete
--

