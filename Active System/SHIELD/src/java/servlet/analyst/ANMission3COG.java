/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.analyst;

import dao.MissionDAO;
import entity.COG;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;
import servlet.father.FatherServlet;

/**
 *
 * @author Dan Torres
 */
public class ANMission3COG extends FatherServlet {

    protected void servletAction(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        MissionDAO msonDAO = new MissionDAO();
        HttpSession session = request.getSession();
        String missionIDString = session.getAttribute("missionID").toString();
        int missionID = Integer.parseInt(missionIDString);
        COG cog = msonDAO.GetCOGOfMission(missionID);
        //TESTING
        if (cog == null) {
            ServletContext context = getServletContext();
            RequestDispatcher dispatch = context.getRequestDispatcher("/analyst/an_mission3cog.jsp");
            dispatch.forward(request, response);
        }
        if (cog.getNodeJSON() == null) { // cog is probably null
            ArrayList eentList = cog.getEentList();
            String eentJSON = new JSONArray(eentList).toString();
            request.setAttribute("entity", eentJSON);
        } else {
            request.setAttribute("nodeJSON", cog.getNodeJSON());
            request.setAttribute("edgeJSON", cog.getEdgeJSON());
        }

        ServletContext context = getServletContext();
        RequestDispatcher dispatch = context.getRequestDispatcher("/analyst/an_mission3cog.jsp");
        dispatch.forward(request, response);

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
